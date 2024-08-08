"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "~/components/ui/input";
import ContentArea from "./ContentArea";

export default function documentList() {
  const tempText = `Long Text Content\n
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
    nisl vel tincidunt lacinia, nisl nisl aliquam nisl, eget aliquam nisl
    nisl vel nisl. Sed euismod, nisl vel tincidunt lacinia, nisl nisl
    aliquam nisl, eget aliquam nisl nisl vel nisl. Sed euismod, nisl vel
    tincidunt lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel
    nisl. Sed euismod, nisl vel tincidunt lacinia, nisl nisl aliquam nisl,
    eget aliquam nisl nisl vel nisl. Sed euismod, nisl vel tincidunt
    lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.\n
    Sed euismod, nisl vel tincidunt lacinia, nisl nisl aliquam nisl, eget
    aliquam nisl nisl vel nisl. Sed euismod, nisl vel tincidunt lacinia,
    nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl. Sed euismod,
    nisl vel tincidunt lacinia, nisl nisl aliquam nisl, eget aliquam nisl
    nisl vel nisl. Sed euismod, nisl vel tincidunt lacinia, nisl nisl
    aliquam nisl, eget aliquam nisl nisl vel nisl. Sed euismod, nisl vel
    tincidunt lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel
    nisl.\n
    Sed euismod, nisl vel tincidunt lacinia, nisl nisl aliquam nisl, eget
    aliquam nisl nisl vel nisl. Sed euismod, nisl vel tincidunt lacinia,
    nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl. Sed euismod,
    nisl vel tincidunt lacinia, nisl nisl aliquam nisl, eget aliquam nisl
    nisl vel nisl. Sed euismod, nisl vel tincidunt lacinia, nisl nisl
    aliquam nisl, eget aliquam nisl nisl vel nisl. Sed euismod, nisl vel
    tincidunt lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel
    nisl.\n`;

  const content = tempText.split("\n");

  return <ContentArea content={content} />;
}
