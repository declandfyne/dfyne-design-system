# Batch 1: Primitive Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add QuantityInput, Accordion, and Search components to `@dfyne/react` using Phosphor Icons, matching the live DFYNE site visually with clean React APIs.

**Architecture:** Three independent components in `packages/react/src/`, each with co-located tests. Components use inline Tailwind-style classes matching the existing pattern (see Button.tsx). Phosphor Icons for all iconography. All components are client components ("use client" directive).

**Tech Stack:** React 19, TypeScript, Vitest, Testing Library, @phosphor-icons/react, @dfyne/tokens CSS variables

---

## File Structure

```
packages/react/
  package.json                          ← modify: add @phosphor-icons/react dependency
  src/
    index.ts                            ← modify: add 3 new exports
    primitives/
      QuantityInput.tsx                 ← create
      QuantityInput.test.tsx            ← create
    disclosure/
      Accordion.tsx                     ← create
      Accordion.test.tsx                ← create
    search/
      Search.tsx                        ← create
      Search.test.tsx                   ← create
CLAUDE.md                               ← modify: add 3 components to list
```

---

### Task 1: Install Phosphor Icons

**Files:**
- Modify: `packages/react/package.json`

- [ ] **Step 1: Add @phosphor-icons/react dependency**

```bash
cd /Users/declanmalone/Desktop/dfyne-design-system
pnpm add @phosphor-icons/react --filter @dfyne/react
```

- [ ] **Step 2: Verify install**

```bash
pnpm ls @phosphor-icons/react --filter @dfyne/react
```

Expected: `@phosphor-icons/react` listed in dependencies

- [ ] **Step 3: Commit**

```bash
git add packages/react/package.json pnpm-lock.yaml
git commit -m "chore: add @phosphor-icons/react to @dfyne/react"
```

---

### Task 2: QuantityInput — Tests

**Files:**
- Create: `packages/react/src/primitives/QuantityInput.test.tsx`

- [ ] **Step 1: Write the tests**

```tsx
// packages/react/src/primitives/QuantityInput.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuantityInput } from "./QuantityInput";

describe("QuantityInput", () => {
  it("renders the current value", () => {
    render(<QuantityInput value={3} onChange={() => {}} />);
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(3);
  });

  it("calls onChange with incremented value when plus is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantityInput value={2} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /increase/i }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("calls onChange with decremented value when minus is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantityInput value={5} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /decrease/i }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("disables minus button at min value", () => {
    render(<QuantityInput value={1} onChange={() => {}} min={1} />);
    expect(screen.getByRole("button", { name: /decrease/i })).toBeDisabled();
  });

  it("disables plus button at max value", () => {
    render(<QuantityInput value={99} onChange={() => {}} max={99} />);
    expect(screen.getByRole("button", { name: /increase/i })).toBeDisabled();
  });

  it("disables all controls when disabled prop is true", () => {
    render(<QuantityInput value={3} onChange={() => {}} disabled />);
    expect(screen.getByRole("spinbutton")).toBeDisabled();
    expect(screen.getByRole("button", { name: /decrease/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /increase/i })).toBeDisabled();
  });

  it("clamps typed value to min/max on blur", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantityInput value={5} onChange={onChange} min={1} max={10} />);
    const input = screen.getByRole("spinbutton");
    await user.clear(input);
    await user.type(input, "25");
    await user.tab(); // blur
    expect(onChange).toHaveBeenLastCalledWith(10);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd /Users/declanmalone/Desktop/dfyne-design-system
pnpm --filter @dfyne/react test -- src/primitives/QuantityInput.test.tsx
```

Expected: FAIL — module `./QuantityInput` not found

---

### Task 3: QuantityInput — Implementation

**Files:**
- Create: `packages/react/src/primitives/QuantityInput.tsx`

- [ ] **Step 1: Write the component**

```tsx
// packages/react/src/primitives/QuantityInput.tsx
"use client";

import { Minus, Plus } from "@phosphor-icons/react";

export function QuantityInput({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  className = "",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}) {
  const atMin = value <= min;
  const atMax = value >= max;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseInt(e.target.value, 10);
    if (!isNaN(raw)) {
      onChange(raw);
    }
  };

  const handleBlur = () => {
    if (value < min) onChange(min);
    else if (value > max) onChange(max);
  };

  return (
    <div
      className={`inline-flex items-center border border-[#e8e8e1] ${disabled ? "opacity-50" : ""} ${className}`}
      style={{ height: 42 }}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={disabled || atMin}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-full w-[42px] items-center justify-center border-r border-[#e8e8e1] text-[#111111] disabled:text-[#aaaaaa] disabled:cursor-not-allowed"
      >
        <Minus size={14} weight="bold" />
      </button>

      <input
        type="number"
        value={value}
        onChange={handleInput}
        onBlur={handleBlur}
        disabled={disabled}
        min={min}
        max={max}
        aria-label="Quantity"
        className="h-full w-[42px] border-none bg-transparent text-center text-[13px] font-normal text-[#111111] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        style={{ fontFamily: "Raleway, sans-serif" }}
      />

      <button
        type="button"
        aria-label="Increase quantity"
        disabled={disabled || atMax}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-full w-[42px] items-center justify-center border-l border-[#e8e8e1] text-[#111111] disabled:text-[#aaaaaa] disabled:cursor-not-allowed"
      >
        <Plus size={14} weight="bold" />
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Run tests to verify they pass**

```bash
pnpm --filter @dfyne/react test -- src/primitives/QuantityInput.test.tsx
```

Expected: All 7 tests PASS

- [ ] **Step 3: Commit**

```bash
git add packages/react/src/primitives/QuantityInput.tsx packages/react/src/primitives/QuantityInput.test.tsx
git commit -m "feat(react): add QuantityInput component with tests"
```

---

### Task 4: Accordion — Tests

**Files:**
- Create: `packages/react/src/disclosure/Accordion.test.tsx`

- [ ] **Step 1: Write the tests**

```tsx
// packages/react/src/disclosure/Accordion.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion, AccordionItem } from "./Accordion";

describe("Accordion", () => {
  it("renders all item titles", () => {
    render(
      <Accordion>
        <AccordionItem title="First">Content 1</AccordionItem>
        <AccordionItem title="Second">Content 2</AccordionItem>
      </Accordion>
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("shows content when defaultOpen is true", () => {
    render(
      <Accordion>
        <AccordionItem title="Open" defaultOpen>
          Visible content
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText("Visible content")).toBeVisible();
  });

  it("hides content by default", () => {
    render(
      <Accordion>
        <AccordionItem title="Closed">Hidden content</AccordionItem>
      </Accordion>
    );
    expect(screen.getByText("Hidden content")).not.toBeVisible();
  });

  it("toggles content on click", async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem title="Toggle">Toggle content</AccordionItem>
      </Accordion>
    );
    await user.click(screen.getByText("Toggle"));
    expect(screen.getByText("Toggle content")).toBeVisible();
    await user.click(screen.getByText("Toggle"));
    expect(screen.getByText("Toggle content")).not.toBeVisible();
  });

  it("single-open mode: opening one closes another", async () => {
    const user = userEvent.setup();
    render(
      <Accordion allowMultiple={false}>
        <AccordionItem title="First" defaultOpen>
          Content 1
        </AccordionItem>
        <AccordionItem title="Second">Content 2</AccordionItem>
      </Accordion>
    );
    expect(screen.getByText("Content 1")).toBeVisible();
    await user.click(screen.getByText("Second"));
    expect(screen.getByText("Content 2")).toBeVisible();
    expect(screen.getByText("Content 1")).not.toBeVisible();
  });

  it("multi-open mode: multiple items stay open", async () => {
    const user = userEvent.setup();
    render(
      <Accordion allowMultiple>
        <AccordionItem title="First" defaultOpen>
          Content 1
        </AccordionItem>
        <AccordionItem title="Second">Content 2</AccordionItem>
      </Accordion>
    );
    await user.click(screen.getByText("Second"));
    expect(screen.getByText("Content 1")).toBeVisible();
    expect(screen.getByText("Content 2")).toBeVisible();
  });

  it("disabled item does not toggle", async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem title="Disabled" disabled>
          Should stay hidden
        </AccordionItem>
      </Accordion>
    );
    await user.click(screen.getByText("Disabled"));
    expect(screen.getByText("Should stay hidden")).not.toBeVisible();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pnpm --filter @dfyne/react test -- src/disclosure/Accordion.test.tsx
```

Expected: FAIL — module `./Accordion` not found

---

### Task 5: Accordion — Implementation

**Files:**
- Create: `packages/react/src/disclosure/Accordion.tsx`

- [ ] **Step 1: Write the component**

```tsx
// packages/react/src/disclosure/Accordion.tsx
"use client";

import { createContext, useContext, useState, useCallback, useId } from "react";
import { CaretDown } from "@phosphor-icons/react";

type AccordionContextType = {
  openItems: Set<string>;
  toggle: (id: string) => void;
};

const AccordionContext = createContext<AccordionContextType>({
  openItems: new Set(),
  toggle: () => {},
});

export function Accordion({
  allowMultiple = false,
  children,
  className = "",
}: {
  allowMultiple?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = useCallback(
    (id: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!allowMultiple) next.clear();
          next.add(id);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  title,
  defaultOpen = false,
  disabled = false,
  children,
  className = "",
}: {
  title: string;
  defaultOpen?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const itemId = useId();
  const { openItems, toggle } = useContext(AccordionContext);

  // Register defaultOpen on first render
  const [initialized] = useState(() => {
    if (defaultOpen) {
      // We need to use toggle in an effect-like way, but since we're in state init
      // we handle it by checking if this item should be open
    }
    return true;
  });

  // Use local state that syncs with context for defaultOpen support
  const [localInit] = useState(defaultOpen);
  const isOpenFromContext = openItems.has(itemId);
  const [hasInteracted, setHasInteracted] = useState(false);
  const isOpen = hasInteracted ? isOpenFromContext : localInit;

  const handleToggle = () => {
    if (disabled) return;
    if (!hasInteracted) {
      setHasInteracted(true);
      // If it was default open and we're closing, just toggle
      // If it was default closed and we're opening, toggle
      if (!localInit) {
        toggle(itemId);
      }
      // If localInit was true, we need to NOT add to context (it's closing)
      return;
    }
    toggle(itemId);
  };

  const contentId = `accordion-content-${itemId}`;
  const triggerId = `accordion-trigger-${itemId}`;

  return (
    <div
      className={`border-t border-[#e8e8e1] last:border-b ${className}`}
    >
      <button
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        disabled={disabled}
        onClick={handleToggle}
        className={`flex w-full items-center justify-between py-[14px] text-left ${disabled ? "cursor-default text-[#aaaaaa]" : "cursor-pointer text-[#111111]"}`}
      >
        <span
          className="text-[10px] font-semibold uppercase"
          style={{
            fontFamily: "Raleway, sans-serif",
            letterSpacing: "1.5px",
          }}
        >
          {title}
        </span>
        <CaretDown
          size={16}
          weight="bold"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        style={{
          display: isOpen ? "block" : "none",
        }}
      >
        <div
          className="pb-[14px] text-[13px] font-normal leading-[1.6] text-[#111111]"
          style={{ fontFamily: "Raleway, sans-serif" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
```

Wait — that defaultOpen logic is getting complicated. Let me simplify. The Accordion context should accept initial open IDs.

```tsx
// packages/react/src/disclosure/Accordion.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import { CaretDown } from "@phosphor-icons/react";

type AccordionContextType = {
  openItems: Set<number>;
  toggle: (index: number) => void;
};

const AccordionContext = createContext<AccordionContextType>({
  openItems: new Set(),
  toggle: () => {},
});

export function Accordion({
  allowMultiple = false,
  children,
  className = "",
}: {
  allowMultiple?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  // Collect defaultOpen indices on mount
  const [openItems, setOpenItems] = useState<Set<number>>(() => {
    const defaults = new Set<number>();
    Children.forEach(children, (child, i) => {
      if (isValidElement(child) && child.props.defaultOpen) {
        defaults.add(i);
      }
    });
    return defaults;
  });

  const toggle = useCallback(
    (index: number) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          if (!allowMultiple) next.clear();
          next.add(index);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className={className}>
        {Children.map(children, (child, i) => {
          if (isValidElement(child)) {
            return cloneElement(child as React.ReactElement<{ _index?: number }>, {
              _index: i,
            });
          }
          return child;
        })}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  title,
  defaultOpen: _defaultOpen,
  disabled = false,
  children,
  className = "",
  _index = 0,
}: {
  title: string;
  defaultOpen?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  _index?: number;
}) {
  const { openItems, toggle } = useContext(AccordionContext);
  const isOpen = openItems.has(_index);

  const handleToggle = () => {
    if (disabled) return;
    toggle(_index);
  };

  const contentId = `accordion-content-${_index}`;
  const triggerId = `accordion-trigger-${_index}`;

  return (
    <div className={`border-t border-[#e8e8e1] last:border-b ${className}`}>
      <button
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        disabled={disabled}
        onClick={handleToggle}
        className={`flex w-full items-center justify-between py-[14px] text-left ${disabled ? "cursor-default text-[#aaaaaa]" : "cursor-pointer text-[#111111]"}`}
      >
        <span
          className="text-[10px] font-semibold uppercase"
          style={{
            fontFamily: "Raleway, sans-serif",
            letterSpacing: "1.5px",
          }}
        >
          {title}
        </span>
        <CaretDown
          size={16}
          weight="bold"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div
          className="pb-[14px] text-[13px] font-normal leading-[1.6] text-[#111111]"
          style={{ fontFamily: "Raleway, sans-serif" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Run tests to verify they pass**

```bash
pnpm --filter @dfyne/react test -- src/disclosure/Accordion.test.tsx
```

Expected: All 7 tests PASS

- [ ] **Step 3: Commit**

```bash
git add packages/react/src/disclosure/Accordion.tsx packages/react/src/disclosure/Accordion.test.tsx
git commit -m "feat(react): add Accordion component with tests"
```

---

### Task 6: Search — Tests

**Files:**
- Create: `packages/react/src/search/Search.test.tsx`

- [ ] **Step 1: Write the tests**

```tsx
// packages/react/src/search/Search.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Search } from "./Search";

describe("Search", () => {
  it("renders input with placeholder", () => {
    render(<Search value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("renders custom placeholder", () => {
    render(<Search value="" onChange={() => {}} placeholder="Find products..." />);
    expect(screen.getByPlaceholderText("Find products...")).toBeInTheDocument();
  });

  it("calls onChange on typing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Search value="" onChange={onChange} />);
    await user.type(screen.getByPlaceholderText("Search"), "dress");
    expect(onChange).toHaveBeenCalledTimes(5);
    expect(onChange).toHaveBeenLastCalledWith("dress");
  });

  it("shows clear button when value is non-empty", () => {
    render(<Search value="test" onChange={() => {}} />);
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });

  it("hides clear button when value is empty", () => {
    render(<Search value="" onChange={() => {}} />);
    expect(screen.queryByRole("button", { name: /clear/i })).not.toBeInTheDocument();
  });

  it("calls onChange with empty string when clear is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Search value="test" onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /clear/i }));
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("renders results dropdown when results are provided", () => {
    render(
      <Search
        value="leg"
        onChange={() => {}}
        results={[
          { id: "1", title: "Power Legging", price: "£54.00", type: "product" },
          { id: "2", title: "Leggings Collection", type: "collection" },
        ]}
      />
    );
    expect(screen.getByText("Power Legging")).toBeInTheDocument();
    expect(screen.getByText("£54.00")).toBeInTheDocument();
    expect(screen.getByText("Leggings Collection")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<Search value="test" onChange={() => {}} loading />);
    expect(screen.getByText("Searching...")).toBeInTheDocument();
  });

  it("shows empty state when results is empty array", () => {
    render(<Search value="xyz" onChange={() => {}} results={[]} />);
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("calls onSelect when a result is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const result = { id: "1", title: "Power Legging", type: "product" as const };
    render(
      <Search value="leg" onChange={() => {}} results={[result]} onSelect={onSelect} />
    );
    await user.click(screen.getByText("Power Legging"));
    expect(onSelect).toHaveBeenCalledWith(result);
  });

  it("closes dropdown on Escape", async () => {
    const user = userEvent.setup();
    render(
      <Search
        value="leg"
        onChange={() => {}}
        results={[{ id: "1", title: "Power Legging", type: "product" }]}
      />
    );
    expect(screen.getByText("Power Legging")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Power Legging")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pnpm --filter @dfyne/react test -- src/search/Search.test.tsx
```

Expected: FAIL — module `./Search` not found

---

### Task 7: Search — Implementation

**Files:**
- Create: `packages/react/src/search/Search.tsx`

- [ ] **Step 1: Write the component**

```tsx
// packages/react/src/search/Search.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";

export type SearchResult = {
  id: string;
  title: string;
  image?: string;
  price?: string;
  type?: "product" | "collection" | "page";
};

export function Search({
  value,
  onChange,
  results,
  onSelect,
  placeholder = "Search",
  loading = false,
  className = "",
}: {
  value: string;
  onChange: (query: string) => void;
  results?: SearchResult[];
  onSelect?: (result: SearchResult) => void;
  placeholder?: string;
  loading?: boolean;
  className?: string;
}) {
  const [showDropdown, setShowDropdown] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasResults = results !== undefined;
  const dropdownVisible = showDropdown && (hasResults || loading);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Re-show dropdown when results change
  useEffect(() => {
    if (hasResults || loading) setShowDropdown(true);
  }, [results, loading, hasResults]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  // Group results by type
  const grouped: Record<string, SearchResult[]> = {};
  if (results) {
    for (const r of results) {
      const key = r.type ?? "other";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(r);
    }
  }

  const typeLabels: Record<string, string> = {
    product: "PRODUCTS",
    collection: "COLLECTIONS",
    page: "PAGES",
    other: "RESULTS",
  };

  return (
    <div ref={containerRef} className={`relative ${className}`} onKeyDown={handleKeyDown}>
      {/* Input */}
      <div className="relative">
        <MagnifyingGlass
          size={16}
          className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-[#888888]"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-[42px] w-full border border-[#e0e0d9] bg-[#fafafa] pl-[42px] pr-[42px] text-[13px] font-normal text-[#111111] outline-none placeholder:text-[#888888] focus:border-[#111111]"
          style={{ fontFamily: "Raleway, sans-serif" }}
        />
        {value && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => onChange("")}
            className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#111111]"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {dropdownVisible && (
        <div
          className="absolute left-0 right-0 top-full z-10 mt-[1px] max-h-[400px] overflow-y-auto border border-[#e8e8e1] bg-white"
          style={{ boxShadow: "var(--shadow-lg, 0 8px 16px rgba(0,0,0,0.10))" }}
        >
          {loading && (
            <div
              className="px-[14px] py-[16px] text-center text-[12px] text-[#888888]"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Searching...
            </div>
          )}

          {!loading && results && results.length === 0 && (
            <div
              className="px-[14px] py-[16px] text-center text-[12px] text-[#888888]"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              No results found
            </div>
          )}

          {!loading &&
            Object.entries(grouped).map(([type, items]) => (
              <div key={type}>
                <div
                  className="px-[14px] py-[10px] text-[10px] font-semibold uppercase text-[#888888]"
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    letterSpacing: "1.5px",
                  }}
                >
                  {typeLabels[type] ?? type.toUpperCase()}
                </div>
                {items.map((result) => (
                  <button
                    key={result.id}
                    type="button"
                    onClick={() => {
                      onSelect?.(result);
                      setShowDropdown(false);
                    }}
                    className="flex w-full items-center gap-3 px-[14px] py-[8px] text-left hover:bg-[#fafafa]"
                  >
                    {result.image && result.type === "product" && (
                      <img
                        src={result.image}
                        alt=""
                        className="h-[40px] w-[40px] rounded-[2px] object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div
                        className="truncate text-[13px] font-normal text-[#111111]"
                        style={{ fontFamily: "Raleway, sans-serif" }}
                      >
                        {result.title}
                      </div>
                    </div>
                    {result.price && (
                      <span
                        className="shrink-0 text-[11px] font-semibold text-[#1c1d1d]"
                        style={{ fontFamily: "Raleway, sans-serif" }}
                      >
                        {result.price}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Run tests to verify they pass**

```bash
pnpm --filter @dfyne/react test -- src/search/Search.test.tsx
```

Expected: All 11 tests PASS

- [ ] **Step 3: Commit**

```bash
git add packages/react/src/search/Search.tsx packages/react/src/search/Search.test.tsx
git commit -m "feat(react): add Search component with tests"
```

---

### Task 8: Wire up exports and update docs

**Files:**
- Modify: `packages/react/src/index.ts`
- Modify: `CLAUDE.md`

- [ ] **Step 1: Add exports to index.ts**

Add these lines to `packages/react/src/index.ts`:

```ts
// Primitives (after ArrowButton export)
export { QuantityInput } from "./primitives/QuantityInput";

// Disclosure
export { Accordion, AccordionItem } from "./disclosure/Accordion";

// Search
export { Search } from "./search/Search";
export type { SearchResult } from "./search/Search";
```

- [ ] **Step 2: Update CLAUDE.md**

Add to the `## Available Components` section in `CLAUDE.md`:

```markdown
- **QuantityInput** — `import { QuantityInput } from '@dfyne/react'`
- **Accordion** — `import { Accordion, AccordionItem } from '@dfyne/react'`
- **Search** — `import { Search } from '@dfyne/react'`
```

Update the component count from 17 to 20 in the Packages section.

- [ ] **Step 3: Run all tests**

```bash
pnpm --filter @dfyne/react test
```

Expected: All tests PASS (QuantityInput: 7, Accordion: 7, Search: 11 = 25 total)

- [ ] **Step 4: Commit**

```bash
git add packages/react/src/index.ts CLAUDE.md
git commit -m "feat(react): export new components and update docs"
```

---

### Task 9: Add components to preview app

**Files:**
- Modify: `apps/preview/src/data/componentSpecs.ts` — add specs for 3 new components
- Modify: `apps/preview/src/data/componentRenders.tsx` — add render cases

- [ ] **Step 1: Add component specs**

Add entries to the `componentSpecs` array in `apps/preview/src/data/componentSpecs.ts` for QuantityInput, Accordion, and Search with:
- `name`: component name
- `reactCode`: example JSX usage string
- `liquidCode`: equivalent Liquid snippet (or note "No Liquid equivalent")
- `variants`: visual spec data

- [ ] **Step 2: Add component renders**

Add render cases to `apps/preview/src/data/componentRenders.tsx` for each component so they display in the Canvas tab.

- [ ] **Step 3: Verify build**

```bash
pnpm turbo build --filter=@dfyne/preview
```

Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add apps/preview/src/data/componentSpecs.ts apps/preview/src/data/componentRenders.tsx
git commit -m "feat(preview): add QuantityInput, Accordion, Search to preview app"
```

---

### Task 10: Deploy

- [ ] **Step 1: Deploy to Vercel**

```bash
vercel --prod
```

- [ ] **Step 2: Verify deployment**

Open the production URL and check that all 3 new components appear in the sidebar and render correctly.
