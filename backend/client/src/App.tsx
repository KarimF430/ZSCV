import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { ModelFormProvider } from "@/contexts/ModelFormContext";
import Dashboard from "@/pages/Dashboard";
import BrandList from "@/pages/BrandList";
import BrandForm from "@/pages/BrandForm";
import ModelList from "@/pages/ModelList";
import ModelFormPage1 from "@/pages/ModelFormPage1";
import ModelFormPage2 from "@/pages/ModelFormPage2";
import ModelFormPage3 from "@/pages/ModelFormPage3";
import ModelFormPage4 from "@/pages/ModelFormPage4";
import VariantList from "@/pages/VariantList";
import VariantFormPage1 from "@/pages/VariantFormPage1";
import VariantFormPage2 from "@/pages/VariantFormPage2";
import VariantFormPage3 from "@/pages/VariantFormPage3";
import VariantFormPage4 from "@/pages/VariantFormPage4";
import VariantFormPage5 from "@/pages/VariantFormPage5";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/brands" component={BrandList} />
      <Route path="/brands/new" component={BrandForm} />
      <Route path="/brands/:id/edit" component={BrandForm} />
      <Route path="/models" component={ModelList} />
      <Route path="/models/new" component={ModelFormPage1} />
      <Route path="/models/new/page2" component={ModelFormPage2} />
      <Route path="/models/new/page3" component={ModelFormPage3} />
      <Route path="/models/new/page4" component={ModelFormPage4} />
      <Route path="/models/:id/edit" component={ModelFormPage1} />
      <Route path="/models/:id/edit/page2" component={ModelFormPage2} />
      <Route path="/models/:id/edit/page3" component={ModelFormPage3} />
      <Route path="/models/:id/edit/page4" component={ModelFormPage4} />
      <Route path="/variants" component={VariantList} />
      <Route path="/variants/new" component={VariantFormPage1} />
      <Route path="/variants/new/page2" component={VariantFormPage2} />
      <Route path="/variants/new/page3" component={VariantFormPage3} />
      <Route path="/variants/new/page4" component={VariantFormPage4} />
      <Route path="/variants/new/page5" component={VariantFormPage5} />
      <Route path="/variants/:id/edit" component={VariantFormPage1} />
      <Route path="/variants/:id/edit/page2" component={VariantFormPage2} />
      <Route path="/variants/:id/edit/page3" component={VariantFormPage3} />
      <Route path="/variants/:id/edit/page4" component={VariantFormPage4} />
      <Route path="/variants/:id/edit/page5" component={VariantFormPage5} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ModelFormProvider>
          <SidebarProvider>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1">
                <AppHeader />
                <main className="flex-1 overflow-auto">
                  <Router />
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </ModelFormProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
