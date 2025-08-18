"use client"
import React, { useMemo, useState, useEffect } from "react"
import { Search, X, Tag, Component, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import type { doctorAgent } from "./AgentCard"

type AgentSearchProps = {
    agents: doctorAgent[]
    onFilteredAgents: (filteredAgents: doctorAgent[]) => void
}

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ")

export default function AgentSearch({ agents, onFilteredAgents }: AgentSearchProps) {
    const [search, setSearch] = useState("")
    const [debounced, setDebounced] = useState("")
    const [tier, setTier] = useState<"all" | "free" | "premium">("all")
    const [tags, setTags] = useState<string[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [sheetOpen, setSheetOpen] = useState(false)

    useEffect(() => {
        const id = setTimeout(() => setDebounced(search.trim()), 200)
        return () => clearTimeout(id)
    }, [search])

    const allCategories = useMemo(() => {
        // First filter agents by search and tier (excluding category filters)
        let filteredForCategories = agents
        if (debounced) {
            const q = debounced.toLowerCase()
            filteredForCategories = filteredForCategories.filter(
                (a) =>
                    a.specialist.toLowerCase().includes(q) ||
                    a.description.toLowerCase().includes(q)
            )
        }
        if (tier !== "all") {
            filteredForCategories = filteredForCategories.filter((a) => (tier === "free" ? !a.subscriptionRequired : a.subscriptionRequired))
        }
        
        // Then collect categories only from the filtered agents
        const set = new Set<string>()
        for (const a of filteredForCategories) set.add(a.category)
        return Array.from(set).sort((a, b) => a.localeCompare(b))
    }, [agents, debounced, tier])

    const allTags = useMemo(() => {
        // First filter agents by search, tier, and categories (excluding tag filters)
        let filteredForTags = agents
        if (debounced) {
            const q = debounced.toLowerCase()
            filteredForTags = filteredForTags.filter(
                (a) =>
                    a.specialist.toLowerCase().includes(q) ||
                    a.description.toLowerCase().includes(q)
            )
        }
        if (tier !== "all") {
            filteredForTags = filteredForTags.filter((a) => (tier === "free" ? !a.subscriptionRequired : a.subscriptionRequired))
        }
        if (categories.length) {
            filteredForTags = filteredForTags.filter((a) => categories.includes(a.category))
        }
        
        // Then collect tags only from the filtered agents
        const set = new Set<string>()
        for (const a of filteredForTags) a.tags?.forEach((t) => set.add(t))
        return Array.from(set).sort((a, b) => a.localeCompare(b))
    }, [agents, debounced, tier, categories])

    const filtered = useMemo(() => {
        let list = agents
        if (debounced) {
            const q = debounced.toLowerCase()
            list = list.filter(
                (a) =>
                    a.specialist.toLowerCase().includes(q) ||
                    a.description.toLowerCase().includes(q)
            )
        }
        if (tier !== "all") {
            list = list.filter((a) => (tier === "free" ? !a.subscriptionRequired : a.subscriptionRequired))
        }
        if (categories.length) {
            list = list.filter((a) => categories.includes(a.category))
        }
        if (tags.length) {
            list = list.filter((a) => a.tags && tags.every((t) => a.tags!.includes(t)))
        }
        return list
    }, [agents, debounced, tier, categories, tags])

    useEffect(() => {
        onFilteredAgents(filtered)
    }, [filtered, onFilteredAgents])

    const toggleTag = (t: string) =>
        setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

    const toggleCategory = (c: string) =>
        setCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))

    const clearAll = () => {
        setSearch("")
        setDebounced("")
        setTier("all")
        setTags([])
        setCategories([])
    }

    const hasFilters = Boolean(search.trim() || tags.length || categories.length || tier !== "all")

    return (
        <div className="w-full">
            <div className="bg-background/60 backdrop-blur p-3 sm:p-4 sm:px-0">
                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search agents (name, specialty, description)"
                            aria-label="Search agents"
                            className="pl-9 pr-9 h-10"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                aria-label="Clear search"
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-muted"
                            >
                                <X className="h-4 w-4 opacity-60" />
                            </button>
                        )}
                    </div>

                    <div className="hidden md:flex rounded-lg border p-1 bg-background">
                        {["all", "free", "premium"].map((key) => (
                            <Button
                                key={key}
                                type="button"
                                size="sm"
                                variant={tier === (key as typeof tier) ? "default" : "ghost"}
                                onClick={() => setTier(key as typeof tier)}
                                className={cx("h-8 px-3 text-xs", tier === key && "shadow-sm")}
                                aria-pressed={tier === key}
                            >
                                {key === "all" ? "All" : key === "free" ? "Free" : "Pro"}
                            </Button>
                        ))}
                    </div>

                    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="md:hidden" aria-label="Open filters">
                                <Tag className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-80 sm:w-96">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base font-semibold">Filters</h3>
                                    {hasFilters && (
                                        <Button variant="ghost" size="sm" onClick={clearAll}>
                                            Reset
                                        </Button>
                                    )}
                                </div>
                                <div>
                                    <div className="text-sm mb-2 font-medium">Plan</div>
                                    <div className="flex gap-2">
                                        {["all", "free", "premium"].map((key) => (
                                            <Button
                                                key={key}
                                                size="sm"
                                                variant={tier === (key as typeof tier) ? "default" : "outline"}
                                                onClick={() => setTier(key as typeof tier)}
                                                className="h-8"
                                            >
                                                {key === "all" ? "All" : key === "free" ? "Free" : "Pro"}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm mb-2 font-medium">Categories</div>
                                    <CategoryPicker allCategories={allCategories} value={categories} onToggle={toggleCategory} />
                                </div>
                                <div>
                                    <div className="text-sm mb-2 font-medium">Tags</div>
                                    <TagPicker allTags={allTags} value={tags} onToggle={toggleTag} />
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="hidden md:inline-flex h-10" aria-label="Pick categories">
                                <Component className="mr-2 h-4 w-4" /> Categories
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-72 p-0">
                            <div className="p-2">
                                <div className="text-xs text-muted-foreground mb-2">Filter by categories</div>
                                <CategoryPicker allCategories={allCategories} value={categories} onToggle={toggleCategory} />
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="hidden md:inline-flex h-10" aria-label="Pick tags">
                                <Tag className="mr-2 h-4 w-4" /> Tags
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-72 p-0">
                            <div className="p-2">
                                <div className="text-xs text-muted-foreground mb-2">Filter by tags</div>
                                <TagPicker allTags={allTags} value={tags} onToggle={toggleTag} />
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-muted-foreground">Showing</span>
                    <Badge variant="secondary" className="text-xs">
                        {filtered.length}/{agents.length}
                    </Badge>

                    {tier !== "all" && (
                        <Badge variant="default" className="pl-2 pr-1 text-xs">
                            {tier === "free" ? "Free" : "Pro"}
                            <button
                                onClick={() => setTier("all")}
                                aria-label="Remove plan filter"
                                className="ml-1 rounded hover:bg-black/10 p-0.5"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    )}

                    {categories.map((c) => (
                        <Badge key={c} variant="default" className="pl-2 pr-1 text-xs">
                            {c}
                            <button
                                onClick={() => toggleCategory(c)}
                                aria-label={`Remove ${c}`}
                                className="ml-1 rounded hover:bg-black/10 p-0.5"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}

                    {tags.map((t) => (
                        <Badge key={t} variant="outline" className="pl-2 pr-1 text-xs">
                            {t}
                            <button
                                onClick={() => toggleTag(t)}
                                aria-label={`Remove ${t}`}
                                className="ml-1 rounded hover:bg-muted p-0.5"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}

                    {hasFilters && (
                        <>
                            <Separator orientation="vertical" className="h-6" />
                            <Button variant="ghost" size="sm" onClick={clearAll}>
                                Clear all
                            </Button>
                        </>
                    )}

                    <div className="ml-auto hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                        <Sparkles className="h-3.5 w-3.5" />
                        Tip: combine search + tags for precise matching
                    </div>
                </div>
            </div>
        </div>
    )
}

function CategoryPicker({
                         allCategories,
                         value,
                         onToggle,
                     }: {
    allCategories: string[]
    value: string[]
    onToggle: (category: string) => void
}) {
    return (
        <Command>
            <CommandInput placeholder="Search categories..." />
            <CommandList className="max-h-64">
                <CommandEmpty>No categories found.</CommandEmpty>
                <CommandGroup heading="All categories">
                    {allCategories.map((c) => {
                        const checked = value.includes(c)
                        return (
                            <CommandItem
                                key={c}
                                onSelect={() => onToggle(c)}
                                role="menuitemcheckbox"
                                aria-checked={checked}
                                className="cursor-pointer"
                            >
                                <Checkbox
                                    checked={checked}
                                    className="mr-2 pointer-events-none"
                                    aria-hidden
                                />
                                {c}
                            </CommandItem>
                        )
                    })}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}

function TagPicker({
                       allTags,
                       value,
                       onToggle,
                   }: {
    allTags: string[]
    value: string[]
    onToggle: (tag: string) => void
}) {
    return (
        <Command>
            <CommandInput placeholder="Search tags..." />
            <CommandList className="max-h-64">
                <CommandEmpty>No tags found.</CommandEmpty>
                <CommandGroup heading="All tags">
                    {allTags.map((t) => {
                        const checked = value.includes(t)
                        return (
                            <CommandItem
                                key={t}
                                onSelect={() => onToggle(t)}
                                role="menuitemcheckbox"
                                aria-checked={checked}
                                className="cursor-pointer"
                            >
                                <Checkbox
                                    checked={checked}
                                    className="mr-2 pointer-events-none"
                                    aria-hidden
                                />
                                {t}
                            </CommandItem>
                        )
                    })}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
