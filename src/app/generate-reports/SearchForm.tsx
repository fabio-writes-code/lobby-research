"use client";

import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";

const FormSchema = z.object({
  keywords: z.string({
    required_error: "Keywords are required.",
  }),
});

interface SearchFormProps {
  isContent: boolean;
}

const SearchForm = ({ isContent }: SearchFormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      keywords: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    if (form.formState.errors) console.log(form.formState.errors);
    console.log(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex w-full flex-wrap items-end justify-between gap-2 sm:gap-6">
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem className="flex flex-auto items-center gap-4">
                <FormLabel className="py-2">Keywords</FormLabel>
                <FormControl>
                  <Input
                    className="w-full rounded-md bg-muted pl-8 dark:bg-[#1e293b] dark:text-[#94a3b8]"
                    placeholder="Enter keywords separated by commas"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full sm:w-fit"
            type="submit"
            disabled={isContent}
          >
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchForm;
