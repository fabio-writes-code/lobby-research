"use client";

import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { cn } from "~/lib/utils";
import { useTransition } from "react";
import { getDocuments } from "~/actions/getDocuments";
import { useToast } from "~/hooks/use-toast";
import * as Sentry from "@sentry/nextjs";

const FormSchema = z
  .object({
    startDate: z.date({
      required_error: "A starting date is required.",
    }),
    endDate: z.date({
      required_error: "An ending date is required.",
    }),
    keywords: z.string({
      required_error: "Keywords are required.",
    }),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "The end date must be after the start date.",
    path: ["endDate"],
  });

interface DateFormProps {
  setContent: (content: { date: Date; content: string | null }[]) => void;
}

export default function DateForm({ setContent }: DateFormProps) {
  const [isPending, startTransition] = useTransition();
  const {toast} = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      keywords: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    startTransition(() => {
      getDocuments({
        startDate: data.startDate,
        endDate: data.endDate,
      })
        .then((content) => {
          if (!content) {
            toast({
              title: "No Content Found",
              description: "No documents were found for the selected date range.",
              variant: "destructive",
            });
          }
          else { setContent(content);
      if (content.length > 0) {
        toast({
          description: `Successfully loaded ${content.length} document${content.length > 1 ? 's' :''}.`,
        });
      }}
        })
        .catch((e) => {
          toast({
            title: "Error",
            description: "Failed to retrieve documents. Please try again.",
            variant: "destructive",
          });
          
          // Log to Sentry
          Sentry.captureException(e, {
            tags: {
              component: "DateForm",
              action: "getDocuments"
            },
            extra: {
              startDate: data.startDate,
              endDate: data.endDate
            }
          });
          
          if (process.env.NODE_ENV === "development") {
            console.error("Document retrieval error:", e);
          }
        });
    });
  });

  return (
    <>
      <div className="my-auto mb-2 ms-0">
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap items-end justify-start gap-2">
              <div className="">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[180px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                <span>{field.value.toDateString()}</span>
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[180px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                <span>{field.value.toDateString()}</span>
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full" type="submit">
                Retrieve Documents
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {isPending && <div>Loading...</div>}
    </>
  );
}
