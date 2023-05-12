import React from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";

type IconProps = {
    color: string;
  };
  
export function HomeOutlineIcon({ color }: IconProps) {
    return <MaterialCommunityIcons name="home-outline" color={color} size={26} />;
}

export function LogoutVariantIcon({ color }: IconProps) {
    return (
        <MaterialCommunityIcons name="logout-variant" color={color} size={26} />
    );
}

export function BookmarkOutlineIcon({ color }: IconProps) {
    return (
        <MaterialCommunityIcons name="bookmark-outline" color={color} size={26} />
    );
}

export function SettingsIcon({ color }: IconProps) {
    return <MaterialCommunityIcons name="cog" color={color} size={26} />;
}

export function NoteTextOutlineIcon({ color }: IconProps) {
    return (
        <MaterialCommunityIcons name="note-text-outline" color={color} size={26} />
    );
}

export function AccountCheckIcon({ color }: IconProps) {
    return (
        <MaterialCommunityIcons name="account-check" color={color} size={26} />
    );
}
