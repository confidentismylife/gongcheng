import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import postcssPresetEnv from 'postcss-preset-env';
import postcssNormalize from 'postcss-normalize';

export default {
    ident: 'postcss',
    plugins: [
        // 修复一些和 flex 布局相关的 bug
        postcssFlexbugsFixes,
        postcssPresetEnv({
            autoprefixer: {
                grid: true,
                flexbox: 'no-2009',
            },
            stage: 3,
        }),
        postcssNormalize,
    ],
    sourceMap: true,
};
