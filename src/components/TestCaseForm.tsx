import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { generateId } from "../lib/mockData"
import { TestCaseStatus } from "../lib/types"
import { StepInstruction } from "./StepInstruction"
import { RequiredFieldsNote } from "./RequiredFieldsNote"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Textarea } from "./ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

import type { Module, TestCasePriority, TestStep } from "../lib/types"

// Define form schema with zod
const formSchema = z.object({
  testerName: z.string().min(2, "Tester name is required"),
  name: z.string().min(2, "Test case name is required"),
  moduleId: z.string().min(1, "Module selection is required"),
  steps: z.array(
    z.object({
      id: z.string(),
      description: z.string().min(1, "Step description is required"),
      isPredefined: z.boolean(),
      predefinedStepId: z.string().optional(),
      order: z.number(),
    })
  ).min(1, "At least one step is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  completionDate: z.string().optional(),
  priority: z.enum(["low", "medium", "high", "critical"] as const).optional(),
  environment: z.string().optional(),
  version: z.string().optional(),
  notes: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface TestCaseFormProps {
  selectedModule: Module
  onSubmit: (data: FormValues) => void
}

export function TestCaseForm({ selectedModule, onSubmit }: TestCaseFormProps) {
  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      testerName: "",
      name: "",
      moduleId: selectedModule.id,
      steps: [],
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: "",
      completionDate: "",
      priority: "medium",
      environment: "",
      version: "",
      notes: "",
    },
  })

  // Update form when selected module changes
  React.useEffect(() => {
    form.setValue("moduleId", selectedModule.id)
    // Reset steps when module changes
    setSteps([])
    form.setValue("steps", [])
  }, [selectedModule, form])

  // State for steps management
  const [steps, setSteps] = React.useState<Array<TestStep>>([])
  const [newStepIsCustom, setNewStepIsCustom] = React.useState(false)
  const [newStepDescription, setNewStepDescription] = React.useState("")
  const [selectedPredefinedStep, setSelectedPredefinedStep] = React.useState("")

  // Add a new step to the list
  const addStep = () => {
    const newStep: TestStep = {
      id: generateId(),
      description: newStepIsCustom
        ? newStepDescription
        : selectedModule.predefinedSteps.find(step => step.id === selectedPredefinedStep)?.description || "",
      isPredefined: !newStepIsCustom,
      predefinedStepId: newStepIsCustom ? undefined : selectedPredefinedStep,
      order: steps.length + 1,
    }
    
    const updatedSteps = [...steps, newStep]
    setSteps(updatedSteps)
    form.setValue("steps", updatedSteps)
    
    // Reset input fields
    setNewStepDescription("")
    setSelectedPredefinedStep("")
  }

  // Remove a step from the list
  const removeStep = (stepId: string) => {
    const updatedSteps = steps
      .filter(step => step.id !== stepId)
      .map((step, index) => ({
        ...step,
        order: index + 1,
      }))
    
    setSteps(updatedSteps)
    form.setValue("steps", updatedSteps)
  }

  // Form submission handler
  const handleSubmit = (values: FormValues) => {
    onSubmit({
      ...values,
      steps, // Ensure steps are included
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <RequiredFieldsNote />
        
        {/* Tester Name */}
        <FormField
          control={form.control}
          name="testerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Tester Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Test Case Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Test Case Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter test case name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Start Date */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Start Date *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* End Date */}
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">End Date *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Completion Date */}
          <FormField
            control={form.control}
            name="completionDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Date of Completion</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Priority */}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Priority</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Environment */}
        <FormField
          control={form.control}
          name="environment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Environment</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Production, Staging, QA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Version */}
        <FormField
          control={form.control}
          name="version"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Version</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 1.0.0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Steps Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Steps to Perform *</h3>
          
          {/* Display added steps */}
          {steps.length === 0 ? (
            <div className="text-gray-500 italic">No steps added yet. Please add steps below.</div>
          ) : (
            <div className="space-y-2">
              {steps.map((step, index) => (
                <Card key={step.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <StepInstruction number={index + 1} text={step.description} />
                      {step.isPredefined && <span className="ml-2 text-xs text-gray-500">(Predefined)</span>}
                    </div>
                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="sm"
                      className="ml-2"
                      onClick={() => removeStep(step.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Add new step */}
          <Card className="p-4 border-dashed">
            <h4 className="font-medium mb-2">Add a Step</h4>
            
            {/* Step type selector */}
            <div className="flex gap-4 mb-4">
              <Button
                type="button"
                variant={!newStepIsCustom ? "default" : "outline"}
                onClick={() => setNewStepIsCustom(false)}
              >
                Predefined Step
              </Button>
              <Button
                type="button"
                variant={newStepIsCustom ? "default" : "outline"}
                onClick={() => setNewStepIsCustom(true)}
              >
                Custom Step
              </Button>
            </div>
            
            {/* Predefined step selector */}
            {!newStepIsCustom ? (
              <Select
                value={selectedPredefinedStep}
                onValueChange={setSelectedPredefinedStep}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select predefined step" />
                </SelectTrigger>
                <SelectContent>
                  {selectedModule.predefinedSteps.map((step) => (
                    <SelectItem key={step.id} value={step.id}>{step.description}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                placeholder="Enter custom step description"
                value={newStepDescription}
                onChange={e => setNewStepDescription(e.target.value)}
              />
            )}

            {/* Add step button */}
            <Button
              type="button"
              className="mt-4 w-full"
              disabled={(newStepIsCustom && !newStepDescription) || (!newStepIsCustom && !selectedPredefinedStep)}
              onClick={addStep}
            >
              Add Step
            </Button>
          </Card>
          
          {form.formState.errors.steps && (
            <p className="text-red-500 text-sm">{form.formState.errors.steps.message}</p>
          )}
        </div>

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Add any additional notes, observations or comments"
                  className="h-24"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full">Create Test Case</Button>
      </form>
    </Form>
  )
}