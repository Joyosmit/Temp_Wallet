"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useMnemonicStore from "@/lib/mnemonicStore"


type Val = {
    value: string
    label: string
}
export function ComboboxDemo() {
    const {addressArr,setCurrentAddress} = useMnemonicStore();
    const anotherArr:Val[] = [];
    for(let i = 0; i < addressArr.length; i++){
        anotherArr[i] = {
            value: addressArr[i].address,
            label: addressArr[i].address
        }
    }
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const displayAddr = (value: string) => {
    return `${value.slice(0, 6)}...${value.slice(-4)}`
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? displayAddr(anotherArr.find((framework) => framework.value === value)?.label!)
            : "Select Address..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No Address Found</CommandEmpty>
            <CommandGroup>
              {anotherArr.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    setCurrentAddress(currentValue)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
