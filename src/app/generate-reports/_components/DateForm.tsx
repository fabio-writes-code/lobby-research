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
          if (!content) console.log("No new content");
          else setContent(content);
        })
        .catch((e) => console.log(e));
    });
  });

  return (
    <>
      <div className="my-auto ms-0">
        <Form {...form}>
          <form onSubmit={handleSubmit} className="pt-4">
            <div className="flex flex-wrap items-end justify-start gap-2 sm:gap-6">
              <div className="gap-4 space-y-2">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
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
              <div className="gap-4 space-y-2">
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
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
              <Button className="w-full sm:w-fit" type="submit">
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
