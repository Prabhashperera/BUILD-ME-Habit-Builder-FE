import {
    Moon, Utensils, BookOpen, Dumbbell,
} from 'lucide-react';

const habitsForHomePage = [
    {
        id: 1,
        title: "Sleep Mastery",
        icon: Moon,
        color: "text-violet-400",
        glowColor: "shadow-violet-500/20",
        borderColor: "border-violet-500/30",
        bgGradient: "from-violet-500/10 to-purple-500/5",
        progress: 70, // %
        daysCompleted: 21,
        totalDays: 30,
        points: 450,
        type: "sleep"
    },
    {
        id: 2,
        title: "Clean Eating",
        icon: Utensils,
        color: "text-orange-400",
        glowColor: "shadow-orange-500/20",
        borderColor: "border-orange-500/30",
        bgGradient: "from-orange-500/10 to-amber-500/5",
        progress: 45,
        daysCompleted: 14,
        totalDays: 30,
        points: 320,
        type: "eating"
    },
    {
        id: 3,
        title: "Deep Reading",
        icon: BookOpen,
        color: "text-sky-400",
        glowColor: "shadow-sky-500/20",
        borderColor: "border-sky-500/30",
        bgGradient: "from-sky-500/10 to-blue-500/5",
        progress: 10,
        daysCompleted: 3,
        totalDays: 30,
        points: 50,
        type: "reading"
    },
    {
        id: 4,
        title: "Iron Temple",
        icon: Dumbbell,
        color: "text-emerald-400",
        glowColor: "shadow-emerald-500/20",
        borderColor: "border-emerald-500/30",
        bgGradient: "from-emerald-500/10 to-teal-500/5",
        progress: 85,
        daysCompleted: 26,
        totalDays: 30,
        points: 600,
        type: "exercise"
    }
];

export default habitsForHomePage;