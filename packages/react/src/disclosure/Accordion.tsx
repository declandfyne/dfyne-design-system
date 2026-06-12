/**
 * Accordion — collapsible disclosure panels
 *
 * allowMultiple=false (default): only one item open at a time
 * allowMultiple=true: items toggle independently
 */

import React, {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useId,
  useState,
} from "react";
import { CaretDown } from "@phosphor-icons/react";

/* ─── Context ─── */

interface AccordionContextValue {
  openIndices: Set<number>;
  toggle: (index: number) => void;
}

const AccordionContext = createContext<AccordionContextValue>({
  openIndices: new Set(),
  toggle: () => {},
});

/* ─── Accordion ─── */

export function Accordion({
  children,
  allowMultiple = false,
}: {
  children: React.ReactNode;
  allowMultiple?: boolean;
}) {
  // Collect defaultOpen indices from children for initial state
  const [openIndices, setOpenIndices] = useState<Set<number>>(() => {
    const initial = new Set<number>();
    Children.forEach(children, (child, index) => {
      if (isValidElement<AccordionItemProps>(child) && child.props.defaultOpen) {
        initial.add(index);
      }
    });
    return initial;
  });

  const toggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(index);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ openIndices, toggle }}>
      <div>
        {Children.map(children, (child, index) => {
          if (isValidElement<AccordionItemProps & { _index?: number }>(child)) {
            return cloneElement(child, { _index: index });
          }
          return child;
        })}
      </div>
    </AccordionContext.Provider>
  );
}

/* ─── AccordionItem ─── */

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  /** @internal injected by Accordion */
  _index?: number;
}

export function AccordionItem({
  title,
  children,
  disabled = false,
  _index = 0,
}: AccordionItemProps) {
  const { openIndices, toggle } = useContext(AccordionContext);
  const isOpen = openIndices.has(_index);
  const uid = useId();
  const triggerId = `accordion-trigger-${uid}`;
  const panelId = `accordion-panel-${uid}`;

  return (
    <div className="border-t border-[#e8e8e1]">
      <button
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        disabled={disabled}
        onClick={() => toggle(_index)}
        className={`flex w-full items-center justify-between py-[12px] text-[10px] font-semibold uppercase tracking-[1.5px] text-[#111111] disabled:opacity-50 disabled:cursor-default`}
        style={{ fontFamily: "Raleway, sans-serif" }}
      >
        {title}
        <CaretDown
          size={14}
          weight="bold"
          className="transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        style={{ display: isOpen ? "block" : "none" }}
        className="pb-[12px] text-[13px] text-[#111111]"
      >
        {children}
      </div>
    </div>
  );
}
