import {
  DiscordIcon,
  EmailIcon,
  PhoneIcon,
  TelegramIcon,
  TwitterXIcon,
  YouTubeIcon,
} from "./socialIcons";

export const socials = [
  { label: "X", href: "https://twitter.com/geeeeeeemoney", icon: TwitterXIcon },
  { label: "Telegram", href: "https://t.me/geeeemoney", icon: TelegramIcon },
  {
    label: "Discord",
    href: "https://discordapp.com/users/449222160687300608",
    icon: DiscordIcon,
  },
  { label: "YouTube", href: "https://www.youtube.com/@geeeeemoney", icon: YouTubeIcon },
  {
    label: "Email",
    href: "mailto:grant@bimross.com",
    icon: EmailIcon,
  },
  {
    label: "Call us",
    action: "call",
    icon: PhoneIcon,
  },
];
