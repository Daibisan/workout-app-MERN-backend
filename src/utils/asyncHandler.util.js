// to wrap async function -> the wrapped async function does'nt need try catch anymore
export default function asyncHandler(func) {
    return (req, res, next) => {
        Promise.resolve(func(req, res, next)).catch(next);
    };
}
