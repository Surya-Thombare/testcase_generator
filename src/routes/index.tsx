import { createFileRoute } from '@tanstack/react-router'

import * as React from "react"
import { toast } from "sonner"
import { getModuleById, mockModules } from "../lib/mockData"
import { TestCaseForm } from "../components/TestCaseForm"
import { ModuleDescription } from "../components/ModuleDescription" 
import { SuccessMessage } from "../components/SuccessMessage"


export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  // State for selected module
  const [selectedModuleId, setSelectedModuleId] = React.useState<string>(mockModules[0]?.id || "")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [showSuccess, setShowSuccess] = React.useState(false)

  // Get the selected module data
  const selectedModule = React.useMemo(() => {
    return getModuleById(selectedModuleId) || mockModules[0];
  }, [selectedModuleId]);

  // Handle form submission
  const handleSubmit = (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Submitting test case:", data);
      setIsSubmitting(false);
      setShowSuccess(true);
      toast.success("Test case created successfully!");
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background/50 to-background flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-4xl bg-card rounded-2xl shadow-xl p-8 flex flex-col gap-8 border border-border">
        <div>
          <h1 className="text-3xl font-bold text-card-foreground mb-2 text-center">Test Case Creator</h1>
          <p className="text-center text-muted-foreground">Create and manage test cases for different modules</p>
        </div>
        
        {showSuccess && <SuccessMessage message="Test case created successfully!" />}
        {/* Module Selector */}
        <section>
          <label htmlFor="module" className="block text-lg font-medium text-foreground mb-2">Select Module</label>
          <select
            id="module"
            className="w-full rounded-lg border border-input px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-ring bg-background"
            value={selectedModuleId}
            onChange={e => setSelectedModuleId(e.target.value)}
            disabled={isSubmitting}
          >
            {mockModules.map((mod) => (
              <option key={mod.id} value={mod.id}>{mod.name}</option>
            ))}
          </select>
          <ModuleDescription description={selectedModule.description} />
        </section>
        {/* Dynamic Form */}
        <section>
          <TestCaseForm 
            selectedModule={selectedModule} 
            onSubmit={handleSubmit} 
          />
        </section>
      </div>
    </main>
  )
}
