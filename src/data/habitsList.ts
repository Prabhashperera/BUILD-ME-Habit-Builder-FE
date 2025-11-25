/* eslint-disable @typescript-eslint/no-explicit-any */
import { Moon, Utensils, BookOpen, Dumbbell } from 'lucide-react';

export interface IHabit {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    points: number;
    days: number;
    icon: any;               // or React.ElementType
    color: string;
    gradient: string;
    activeBorder: string;
}

const habitsList: IHabit[] = [
    {
        id: 1,
        title: "Sleep Well",
        subtitle: "8 Hours Challenge",
        icon: Moon,
        color: "text-violet-400",
        gradient: "from-violet-500/20 to-purple-500/5",
        activeBorder: "border-violet-500",
        description: "Deep sleep cycles",
        points: 25,
        days: 30
    },
    {
        id: 2,
        title: "Clean Eating",
        subtitle: "No Skipping Meals",
        icon: Utensils,
        color: "text-orange-400",
        gradient: "from-orange-500/20 to-amber-500/5",
        activeBorder: "border-orange-500",
        description: "Fuel your body right",
        points: 25,
        days: 30
    },
    {
        id: 3,
        title: "Read Daily",
        subtitle: "20 Pages / Day",
        icon: BookOpen,
        color: "text-sky-400",
        gradient: "from-sky-500/20 to-blue-500/5",
        activeBorder: "border-sky-500",
        description: "Expand your mind",
        points: 25,
        days: 30
    },
    {
        id: 4,
        title: "Gym & Cardio",
        subtitle: "Sweat it out",
        icon: Dumbbell,
        color: "text-emerald-400",
        gradient: "from-emerald-500/20 to-teal-500/5",
        activeBorder: "border-emerald-500",
        description: "Build strength",
        points: 25,
        days: 30
    }
];

export default habitsList