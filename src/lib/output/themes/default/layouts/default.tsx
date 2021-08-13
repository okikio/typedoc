import type { Reflection } from "../../../../models";
import { createElement } from "../../../../utils";
import type { PageEvent } from "../../../events";
import type { DefaultThemeRenderContext } from "../DefaultThemeRenderContext";

export const defaultLayout = (context: DefaultThemeRenderContext, props: PageEvent<Reflection>) => (
    <>
        <html class="default no-js">
            <head>
                <meta charSet="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <title>
                    {props.model.name === props.project.name ? (
                        props.project.name
                    ) : (
                        <>
                            {props.model.name} | {props.project.name}
                        </>
                    )}
                </title>
                <meta name="description" content={"Documentation for " + props.project.name} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link rel="stylesheet" href={context.relativeURL("assets/style.css")} />
                <script async src={context.relativeURL("assets/search.js")} id="search-script"></script>
            </head>
            <body>
                {context.header(props)}

                <div class="container container-main">
                    <div class="row">
                        <div class="col-8 col-content">{props.template(props)}</div>
                        <div class="col-4 col-menu menu-sticky-wrap menu-highlight">
                            <nav class="tsd-navigation primary">
                                <ul>{props.navigation?.children?.map((item) => context.navigation(item))}</ul>
                            </nav>

                            <nav class="tsd-navigation secondary menu-sticky">
                                {(() => {
                                    const children = props.toc?.children ?? [];
                                    let indexOfCurrent = children.findIndex((c) => c.isInPath);
                                    // If none are isInPath, make sure all render within "before" block
                                    if (indexOfCurrent === -1) indexOfCurrent = children.length;
                                    const childrenBefore = children.slice(0, indexOfCurrent);
                                    const childInPath = children[indexOfCurrent];
                                    const childrenAfter = children.slice(indexOfCurrent + 1);
                                    return (
                                        <>
                                            <ul class="before-current">
                                                {childrenBefore.map((item) => context.tocRoot(item))}
                                            </ul>
                                            {childInPath && (
                                                <>
                                                    <ul class="current">{context.tocRoot(childInPath)}</ul>
                                                    <ul class="after-current">
                                                        {childrenAfter.map((item) => context.tocRoot(item))}
                                                    </ul>
                                                </>
                                            )}
                                        </>
                                    );
                                })()}
                            </nav>
                        </div>
                    </div>
                </div>

                {context.footer(props)}

                <div class="overlay"></div>
                <script src={context.relativeURL("assets/main.js")}></script>

                {context.analytics(props)}
            </body>
        </html>
    </>
);
