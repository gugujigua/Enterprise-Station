'use strict'
module.exports = () => {
    return async function getCommonData(ctx,
    next) {
        const info =await ctx.service.common.info.one();
        ctx.locals.info = info;
        const wheel = await ctx.service.common.wheel.all();
        ctx.locals.wheel = wheel;
        ctx.locals.title = "";
        ctx.locals.keywords = "";
        ctx.locals.description = "";
        await next();
    }
}  