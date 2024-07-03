import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, User, HomeIcon } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/account", title: "Account", icon: User },
  { href: "/settings", title: "Settings", icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [
  {
    title: "Entities",
    links: [
      {
        href: "/products",
        title: "Products",
        icon: Globe,
      },
      {
        href: "/categories",
        title: "Categories",
        icon: Globe,
      },
      {
        href: "/pages",
        title: "Pages",
        icon: Globe,
      },
    ],
  },

];

