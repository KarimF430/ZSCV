import type { Express, Request } from "express";
import express from "express";
import { storage } from "./storage";
import { insertBrandSchema, insertModelSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Function to format brand summary with proper sections
function formatBrandSummary(summary: string, brandName: string): {
  sections: Array<{
    title: string;
    content: string;
  }>;
  priceInfo?: string;
} {
  if (!summary) {
    return { sections: [] };
  }

  const sections: Array<{ title: string; content: string }> = [];
  let priceInfo = '';

  // Split by common section indicators
  const lines = summary.split('\n').filter(line => line.trim());
  let currentSection = '';
  let currentContent: string[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Check for section headers
    if (trimmedLine.includes('Start of operations in India:') || 
        trimmedLine.includes('Market Share:') ||
        trimmedLine.includes('Key Aspects:') ||
        trimmedLine.includes('Competitors:')) {
      
      // Save previous section if exists
      if (currentSection && currentContent.length > 0) {
        sections.push({
          title: currentSection,
          content: currentContent.join(' ').trim()
        });
      }
      
      // Start new section
      currentSection = trimmedLine.replace(':', '');
      currentContent = [];
    } else if (trimmedLine.includes('car price starts at') || 
               trimmedLine.includes('cheapest model') ||
               trimmedLine.includes('most expensive model')) {
      // Extract price information
      priceInfo = trimmedLine;
    } else if (currentSection) {
      // Add to current section content
      currentContent.push(trimmedLine);
    } else {
      // First paragraph (overview)
      if (!sections.length) {
        sections.push({
          title: `${brandName} Cars`,
          content: trimmedLine
        });
      }
    }
  }

  // Add final section
  if (currentSection && currentContent.length > 0) {
    sections.push({
      title: currentSection,
      content: currentContent.join(' ').trim()
    });
  }

  return { sections, priceInfo };
}

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Allow all image types for model images, PNG only for logos
    if (req.path === '/api/upload/logo') {
      if (file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(new Error('Only PNG files are allowed for brand logos'));
      }
    } else {
      // Allow common image formats for model images
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed'));
      }
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export function registerRoutes(app: Express) {
  // File upload endpoint for logos
  app.post("/api/upload/logo", upload.single('logo'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl, filename: req.file.filename });
  });

  // Generic image upload endpoint for model images
  app.post("/api/upload/image", upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl, filename: req.file.filename });
  });

  // Serve uploaded files
  app.use('/uploads', express.static(uploadDir));

  // Stats
  app.get("/api/stats", async (req, res) => {
    const stats = await storage.getStats();
    res.json(stats);
  });

  // Brands - with active/inactive filter for frontend
  app.get("/api/brands", async (req, res) => {
    try {
      const includeInactive = req.query.includeInactive === 'true';
      const brands = await storage.getBrands(includeInactive);
      res.json(brands);
    } catch (error) {
      console.error('Error getting brands:', error);
      res.status(500).json({ error: "Failed to get brands" });
    }
  });

  app.get("/api/brands/available-rankings", async (req, res) => {
    const excludeBrandId = req.query.excludeBrandId as string | undefined;
    const availableRankings = await storage.getAvailableRankings(excludeBrandId);
    res.json(availableRankings);
  });

  // Get formatted brand summary with proper sections
  app.get("/api/brands/:id/formatted", async (req, res) => {
    try {
      const brand = await storage.getBrand(req.params.id);
      if (!brand) {
        return res.status(404).json({ error: "Brand not found" });
      }

      // Format the summary with proper sections
      const formattedSummary = formatBrandSummary(brand.summary || '', brand.name);
      
      res.json({
        ...brand,
        formattedSummary
      });
    } catch (error) {
      console.error('Error getting formatted brand:', error);
      res.status(500).json({ error: "Failed to get formatted brand" });
    }
  });

  app.get("/api/brands/:id", async (req, res) => {
    const brand = await storage.getBrand(req.params.id);
    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }
    res.json(brand);
  });

  app.post("/api/brands", async (req, res) => {
    try {
      console.log('Received brand data:', JSON.stringify(req.body, null, 2));
      const validatedData = insertBrandSchema.parse(req.body);
      console.log('Validated data:', JSON.stringify(validatedData, null, 2));
      const brand = await storage.createBrand(validatedData);
      res.status(201).json(brand);
    } catch (error) {
      console.error('Brand creation error:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Invalid brand data" });
      }
    }
  });

  app.patch("/api/brands/:id", async (req, res) => {
    try {
      const brand = await storage.updateBrand(req.params.id, req.body);
      if (!brand) {
        return res.status(404).json({ error: "Brand not found" });
      }
      res.json(brand);
    } catch (error) {
      console.error('Brand update error:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Failed to update brand" });
      }
    }
  });

  app.delete("/api/brands/:id", async (req, res) => {
    const success = await storage.deleteBrand(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Brand not found" });
    }
    res.status(204).send();
  });

  // Models
  app.get("/api/models", async (req, res) => {
    const brandId = req.query.brandId as string | undefined;
    const models = await storage.getModels(brandId);
    res.json(models);
  });

  app.get("/api/models/:id", async (req, res) => {
    const model = await storage.getModel(req.params.id);
    if (!model) {
      return res.status(404).json({ error: "Model not found" });
    }
    res.json(model);
  });

  app.post("/api/models", async (req, res) => {
    try {
      console.log('Received model data:', JSON.stringify(req.body, null, 2));
      const validatedData = insertModelSchema.parse(req.body);
      console.log('Validated data:', JSON.stringify(validatedData, null, 2));
      const model = await storage.createModel(validatedData);
      res.status(201).json(model);
    } catch (error) {
      console.error('Model creation error:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Invalid model data" });
      }
    }
  });

  app.patch("/api/models/:id", async (req, res) => {
    try {
      console.log('🔄 Updating model:', req.params.id);
      console.log('📊 Update data received:', JSON.stringify(req.body, null, 2));
      console.log('🎨 Color Images in request:', req.body.colorImages);
      console.log('🎨 Color Images length:', req.body.colorImages?.length || 0);
      
      const model = await storage.updateModel(req.params.id, req.body);
      if (!model) {
        return res.status(404).json({ error: "Model not found" });
      }
      
      console.log('✅ Model updated successfully');
      console.log('📊 Updated model image data:');
      console.log('- Hero Image:', model.heroImage);
      console.log('- Gallery Images:', model.galleryImages?.length || 0, 'images');
      console.log('- Key Feature Images:', model.keyFeatureImages?.length || 0, 'images');
      console.log('- Space Comfort Images:', model.spaceComfortImages?.length || 0, 'images');
      console.log('- Storage Convenience Images:', model.storageConvenienceImages?.length || 0, 'images');
      console.log('- Color Images:', model.colorImages?.length || 0, 'images');
      console.log('🎨 Color Images saved:', JSON.stringify(model.colorImages, null, 2));
      
      res.json(model);
    } catch (error) {
      console.error('❌ Model update error:', error);
      res.status(500).json({ error: "Failed to update model" });
    }
  });

  app.delete("/api/models/:id", async (req, res) => {
    const success = await storage.deleteModel(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Model not found" });
    }
    res.status(204).send();
  });

  // Variants
  app.get("/api/variants", async (req, res) => {
    const modelId = req.query.modelId as string | undefined;
    const brandId = req.query.brandId as string | undefined;
    const variants = await storage.getVariants(modelId, brandId);
    res.json(variants);
  });

  app.get("/api/variants/:id", async (req, res) => {
    const variant = await storage.getVariant(req.params.id);
    if (!variant) {
      return res.status(404).json({ error: "Variant not found" });
    }
    res.json(variant);
  });

  app.post("/api/variants", async (req, res) => {
    try {
      console.log('🚗 Received variant data:', JSON.stringify(req.body, null, 2));
      
      // Validate required fields
      if (!req.body.brandId || !req.body.modelId || !req.body.name || !req.body.price) {
        console.error('❌ Missing required fields:', {
          brandId: !!req.body.brandId,
          modelId: !!req.body.modelId,
          name: !!req.body.name,
          price: !!req.body.price
        });
        return res.status(400).json({ 
          error: "Missing required fields: brandId, modelId, name, and price are required" 
        });
      }
      
      const variant = await storage.createVariant(req.body);
      console.log('✅ Variant created successfully:', variant.id);
      res.status(201).json(variant);
    } catch (error) {
      console.error('❌ Variant creation error:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message, stack: error.stack });
      } else {
        res.status(400).json({ error: "Invalid variant data" });
      }
    }
  });

  app.patch("/api/variants/:id", async (req, res) => {
    try {
      console.log('🔄 Updating variant:', req.params.id);
      console.log('📊 Update data received:', JSON.stringify(req.body, null, 2));
      
      const variant = await storage.updateVariant(req.params.id, req.body);
      if (!variant) {
        return res.status(404).json({ error: "Variant not found" });
      }
      
      console.log('✅ Variant updated successfully');
      res.json(variant);
    } catch (error) {
      console.error('❌ Variant update error:', error);
      res.status(500).json({ error: "Failed to update variant" });
    }
  });

  app.delete("/api/variants/:id", async (req, res) => {
    const success = await storage.deleteVariant(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Variant not found" });
    }
    res.status(204).send();
  });

  // Frontend API endpoints
  app.get("/api/frontend/brands/:brandId/models", async (req, res) => {
    try {
      const { brandId } = req.params;
      console.log('🚗 Frontend: Getting models for brand:', brandId);
      
      const models = await storage.getModels(brandId);
      const brand = await storage.getBrand(brandId);
      
      if (!brand) {
        return res.status(404).json({ error: "Brand not found" });
      }

      // Transform models for frontend display
      const frontendModels = models.map(model => ({
        id: model.id,
        name: model.name,
        price: "₹7.71", // Will be calculated later
        rating: 4.5, // Will be from reviews later
        reviews: 1247, // Will be from reviews later
        power: "89 bhp", // Will be from engine data
        image: model.heroImage || '/cars/default-car.jpg',
        isNew: model.isNew || false,
        seating: "5 seater", // Will be from specifications
        fuelType: model.fuelTypes?.join('-') || 'Petrol',
        transmission: model.transmissions?.join('-') || 'Manual',
        mileage: "18.3 kmpl", // Will be from mileage data
        variants: 16, // Will be calculated from variants
        slug: model.name.toLowerCase().replace(/\s+/g, '-'),
        brandName: brand.name
      }));

      console.log('✅ Frontend: Returning', frontendModels.length, 'models for brand', brand.name);
      res.json({
        brand: {
          id: brand.id,
          name: brand.name,
          slug: brand.name.toLowerCase().replace(/\s+/g, '-')
        },
        models: frontendModels
      });
    } catch (error) {
      console.error('❌ Frontend models error:', error);
      res.status(500).json({ error: "Failed to fetch models" });
    }
  });

  app.get("/api/frontend/models/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      console.log('🚗 Frontend: Getting model by slug:', slug);
      
      const models = await storage.getModels();
      const model = models.find(m => 
        m.name.toLowerCase().replace(/\s+/g, '-') === slug
      );
      
      if (!model) {
        return res.status(404).json({ error: "Model not found" });
      }

      const brand = await storage.getBrand(model.brandId);
      
      // Transform model for frontend display
      const frontendModel = {
        id: model.id,
        name: model.name,
        brandName: brand?.name || 'Unknown',
        heroImage: model.heroImage,
        galleryImages: model.galleryImages || [],
        keyFeatureImages: model.keyFeatureImages || [],
        spaceComfortImages: model.spaceComfortImages || [],
        storageConvenienceImages: model.storageConvenienceImages || [],
        colorImages: model.colorImages || [],
        description: model.description,
        pros: model.pros,
        cons: model.cons,
        exteriorDesign: model.exteriorDesign,
        comfortConvenience: model.comfortConvenience,
        engineSummaries: model.engineSummaries || [],
        mileageData: model.mileageData || [],
        faqs: model.faqs || [],
        fuelTypes: model.fuelTypes || [],
        transmissions: model.transmissions || [],
        bodyType: model.bodyType,
        subBodyType: model.subBodyType,
        launchDate: model.launchDate,
        isPopular: model.isPopular,
        isNew: model.isNew
      };

      console.log('✅ Frontend: Returning model details for', model.name);
      res.json(frontendModel);
    } catch (error) {
      console.error('❌ Frontend model error:', error);
      res.status(500).json({ error: "Failed to fetch model" });
    }
  });

}
