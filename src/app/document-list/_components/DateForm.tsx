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

//
// 1) Zod schema that allows empty or valid date range
//
const FormSchema = z
  .object({
    startDate: z.date().optional(),
    endDate: z.date().optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate >= data.startDate;
      }
      return true; // no error if one or both are undefined
    },
    {
      message: "The end date must be after or equal to the start date.",
      path: ["endDate"],
    }
  );

//
// 2) Props to keep the parent’s data in sync with the form
//
interface DateFormProps {
  startDate: Date | null;
  endDate: Date | null;
  onChangeStart: (startDate: Date | null) => void;
  onChangeEnd: (endDate: Date | null) => void;
}

export default function DateForm({
  startDate,
  endDate,
  onChangeStart,
  onChangeEnd,
}: DateFormProps) {
  //
  // 3) Initialize form’s default values from parent props
  //
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startDate: startDate ?? undefined,
      endDate: endDate ?? undefined,
    },
  });

  //
  // 4) On submit, update the parent’s state with the user’s chosen dates
  //
  const handleSubmit = form.handleSubmit((data) => {
    onChangeStart(data.startDate ?? null);
    onChangeEnd(data.endDate ?? null);
  });

  return (
    <div className="my-auto mb-2 ms-0">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap items-end justify-start gap-2">
            {/* Start Date Field */}
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
                          variant="outline"
                          className={cn(
                            "w-[180px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
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

            {/* End Date Field */}
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
                          variant="outline"
                          className={cn(
                            "w-[180px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
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

            <Button className="w-full" type="submit">
              Retrieve Documents
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
