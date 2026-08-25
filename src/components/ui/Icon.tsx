import {
  ArrowRight,
  Bell,
  Brain,
  Building2,
  Check,
  ChartNoAxesColumn,
  Clock,
  Globe,
  Layers,
  Mail,
  Megaphone,
  MessageSquare,
  Play,
  Send,
  Shield,
  Split,
  Sparkles,
  Store,
  Target,
  Users,
  Wand2,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types/common";

/**
 * Maps the content layer's icon names to lucide components.
 *
 * Content config names icons rather than importing them, so a copy change
 * never has to touch a component — and the union in types/common.ts keeps
 * a typo from reaching the page.
 */
const ICONS: Record<IconName, LucideIcon> = {
  sparkles: Sparkles,
  wand: Wand2,
  target: Target,
  send: Send,
  split: Split,
  workflow: Workflow,
  brain: Brain,
  chart: ChartNoAxesColumn,
  globe: Globe,
  bell: Bell,
  mail: Mail,
  message: MessageSquare,
  shield: Shield,
  layers: Layers,
  zap: Zap,
  clock: Clock,
  users: Users,
  store: Store,
  building: Building2,
  megaphone: Megaphone,
  check: Check,
  "arrow-right": ArrowRight,
  play: Play,
};

interface IconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, className, strokeWidth = 1.75 }: IconProps) {
  const Glyph = ICONS[name];
  return (
    <Glyph className={className} strokeWidth={strokeWidth} aria-hidden="true" />
  );
}
