export function canAccessWorkout(user, workout) {
    if (!user || !workout) return false;

    if (user.role === "admin") return true;

    return workout.user_id.toString() === req.user._id.toString();
}