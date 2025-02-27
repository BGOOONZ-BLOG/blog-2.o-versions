## Action Link

> This class is a React component that renders a link to a URL, with optional styling and attributes. */
```jsx
import React from 'react';
import _ from 'lodash';

import {Link, withPrefix, classNames} from '../utils';
import Icon from './Icon';

export default class ActionLink extends React.Component {
    render() {
        let action = _.get(this.props, 'action', null);
        return (
            <Link to={withPrefix(_.get(action, 'url', null))}
              {...(_.get(action, 'new_window', null) ? ({target: '_blank'}) : null)}
              {...((_.get(action, 'new_window', null) || _.get(action, 'no_follow', null)) ? ({rel: (_.get(action, 'new_window', null) ? ('noopener ') : '') + (_.get(action, 'no_follow', null) ? ('nofollow') : '')}) : null)}
              className={classNames({'button': _.get(action, 'style', null) !== 'link', 'button-secondary': _.get(action, 'style', null) === 'secondary', 'button-icon': _.get(action, 'style', null) === 'icon'})}>
              {((_.get(action, 'style', null) === 'icon') && _.get(action, 'icon_class', null)) ? (<React.Fragment>
                <Icon {...this.props} icon={_.get(action, 'icon_class', null)} />
                <span className="screen-reader-text">{_.get(action, 'label', null)}</span>
              </React.Fragment>) : 
                _.get(action, 'label', null)
              }
            </Link>
        );
    }
}
```
# CtaButtons
>  It's a React component that renders a button or a link. */
```jsx
import React from 'react';
import _ from 'lodash';

import {Link, withPrefix, classNames} from '../utils';

export default class CtaButtons extends React.Component {
    render() {
        let actions = _.get(this.props, 'actions', null);
        return (
            _.map(actions, (action, action_idx) => (
            <Link key={action_idx} to={withPrefix(_.get(action, 'url', null))}
              {...(_.get(action, 'new_window', null) ? ({target: '_blank'}) : null)}
              {...((_.get(action, 'new_window', null) || _.get(action, 'no_follow', null)) ? ({rel: (_.get(action, 'new_window', null) ? ('noopener ') : '') + (_.get(action, 'no_follow', null) ? ('nofollow') : '')}) : null)}
              className={classNames({'button': (_.get(action, 'style', null) === 'primary') || (_.get(action, 'style', null) === 'secondary'), 'button-secondary': _.get(action, 'style', null) === 'secondary'})}>{_.get(action, 'label', null)}</Link>
            ))
        );
    }
}
```
---

## DocsMenu

>   It's a React component that renders a menu of links to pages in a Hugo site. */
```jsx
import React from 'react';
import _ from 'lodash';

import {getPage, classNames, Link, withPrefix, pathJoin, getPages} from '../utils';
import DocsSubmenu from './DocsSubmenu';

export default class DocsMenu extends React.Component {
    render() {
        let site = _.get(this.props, 'site', null);
        let page = _.get(this.props, 'page', null);
        let root_docs_path = _.get(site, 'data.doc_sections.root_docs_path', null);
        let root_page = getPage(this.props.pageContext.pages, root_docs_path);
        return (
            <nav id="docs-nav" className="docs-nav">
              <div id="docs-nav-inside" className="docs-nav-inside sticky">
                <button id="docs-nav-toggle" className="docs-nav-toggle">Navigate Docs<span className="icon-angle-right" aria-hidden="true" /></button>
                <div className="docs-nav-menu">
                  <ul id="docs-menu" className="docs-menu">
                    <li className={classNames('docs-menu-item', {'current': _.get(page, 'url', null) === _.get(root_page, 'url', null)})}>
                      <Link to={withPrefix(_.get(root_page, 'url', null))}>{_.get(root_page, 'frontmatter.title', null)}</Link>
                    </li>
                    {_.map(_.get(site, 'data.doc_sections.sections', null), (section, section_idx) => {
                        let section_path = pathJoin(root_docs_path, section);
                        let section_page = getPage(this.props.pageContext.pages, section_path);
                        let child_pages = _.orderBy(getPages(this.props.pageContext.pages, section_path), 'frontmatter.weight');
                        let child_count = _.size(child_pages);
                        let has_children = (child_count > 0) ? (true) : false;
                        let is_current_page = (_.get(page, 'url', null) === _.get(section_page, 'url', null)) ? (true) : false;
                        let is_active = _.get(page, 'url', null).startsWith(_.get(section_page, 'url', null));
                        return (<React.Fragment key={section_idx + '.1'}>
                          <li key={section_idx} className={classNames('docs-menu-item', {'has-children': has_children, 'current': is_current_page, 'active': is_active})}>
                            <Link to={withPrefix(_.get(section_page, 'url', null))}>{_.get(section_page, 'frontmatter.title', null)}</Link>
                            {has_children && (<React.Fragment>
                              <button className="docs-submenu-toggle"><span className="screen-reader-text">Submenu</span><span className="icon-angle-right" aria-hidden="true" /></button>
                              <DocsSubmenu {...this.props} child_pages={child_pages} page={page} site={site} />
                            </React.Fragment>)}
                          </li>
                        </React.Fragment>)
                    })}
                  </ul>
                </div>
              </div>
            </nav>
        );
    }
}
```
---

## DocsSubmenu

>   This class renders a list of links to child pages of the current page. */
```jsx
import React from 'react';
import _ from 'lodash';

import {classNames, Link, withPrefix} from '../utils';

export default class DocsSubmenu extends React.Component {
    render() {
        let child_pages = _.get(this.props, 'child_pages', null);
        let page = _.get(this.props, 'page', null);
        return (
            <ul className="docs-submenu">
              {_.map(child_pages, (child_page, child_page_idx) => (
                <li key={child_page_idx} className={classNames('docs-menu-item', {'current': _.get(page, 'url', null) === _.get(child_page, 'url', null)})}>
                  <Link to={withPrefix(_.get(child_page, 'url', null))}>{_.get(child_page, 'frontmatter.title', null)}</Link>
                </li>
              ))}
            </ul>
        );
    }
}
```
---

##

>   
import _ from 'lodash';
```jsx
import React from 'react';
import { htmlToReact } from '../utils';
import ActionLink from './ActionLink';
export default class Footer extends React.Component {
    render() {
        return (
            <footer id="colophon" className="site-footer outer">
                <div>
                        <table cellPadding={0}
                            cellSpacing={0}
                            border={0}>
                            <tbody>
                                <tr>
                                    <td style={
                                        {
                                            fontFamily: 'Arial, Helvetica, sans-serif',
                                            fontSize: '7.5pt'
                                        }
                                    }>
                                            <table width="95%"
                                                cellPadding={0}
                                                cellSpacing={0}
                                                border={0}
                                                style={
                                                    {
                                                        fontFamily: 'Arial, Helvetica, sans-serif',
                                                        fontSize: '7.5pt'
                                                    }
                                                }>
                                                <tbody>
                                                    <tr>
                                                        <td style={
                                                            {
                                                                fontFamily: 'Arial, Helvetica, sans-serif',
                                                                fontSize: '7.5pt'
                                                            }
                                                        }
                                                            align="left">
                                                            <a target="_blank" href="https://search.freefind.com/siteindex.html?si=14588965">
                                                                index
                                                            </a>
                                                        </td>
                                                        <td style={
                                                            {
                                                                fontFamily: 'Arial, Helvetica, sans-serif',
                                                                fontSize: '7.5pt'
                                                            }
                                                        }
                                                            align="center">
                                                            <a target="_blank" href="https://search.freefind.com/find.html?si=14588965&m=0&p=0">
                                                                sitemap
                                                            </a>
                                                        </td>
                                                        <td style={
                                                            {
                                                                fontFamily: 'Arial, Helvetica, sans-serif',
                                                                fontSize: '7.5pt'
                                                            }
                                                        }
                                                            align="right">
                                                            <a target="_blank" href="https://search.freefind.com/find.html?si=14588965&pid=a">
                                                                advanced
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        <form style={
                                            {
                                                margin: '0px',
                                                marginTop: '2px'
                                            }
                                        }
                                            action="https://search.freefind.com/find.html"
                                            method="get"
                                            acceptCharset="utf-8"
                                            target="_self">
                                            <input type="hidden" name="si"
                                                defaultValue={14588965} />
                                            <input type="hidden" name="pid" defaultValue="r" />
                                            <input type="hidden" name="n"
                                                defaultValue={0} />
                                            <input type="hidden" name="_charset_" defaultValue />
                                            <input type="hidden" name="bcd" defaultValue="÷" />
                                            <input type="text" name="query"
                                                size={15} />
                                            <input type="submit" defaultValue="search" />
                                        </form>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={
                                        {
                                            textAlign: 'center',
                                            fontFamily: 'Arial, Helvetica, sans-serif',
                                            fontSize: '7.5pt',
                                            paddingTop: '4px'
                                        }
                                    }>
                                        <a style={
                                            {
                                                textDecoration: 'none',
                                                color: 'transparent'
                                            }
                                        }
                                            href="https://www.freefind.com"
                                            rel="nofollow">
                                            search engine
                                        </a>
                                        <a style={
                                            {
                                                textDecoration: 'none',
                                                color: 'transparent'
                                            }
                                        }
                                            href="https://www.freefind.com"
                                            rel="nofollow">
                                            by
                                            <span style={
                                                { color: 'transparent' }
                                            }>freefind</span>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
<a href = "//pdfcrowd.com/url_to_pdf/?" onclick = {`if(!this.p)href+='&url='+encodeURIComponent(location.href);this.p=1`} > Save to PDF </a>
                </div>
                <div className="inner">
                    <div id="search" className="inner"></div>
                    <div className="site-footer-inside">
                        <p className="site-info">
                            {
                                _.get(this.props, 'pageContext.site.siteMetadata.footer.content', null) && (
                                    <span className="copyright">
                                        {
                                            htmlToReact(_.get(this.props, 'pageContext.site.siteMetadata.footer.content', null))
                                        }</span>
                                )
                            }
                            {
                                _.map(_.get(this.props, 'pageContext.site.siteMetadata.footer.links', null), (action, action_idx) => (
                                    <ActionLink key={action_idx}
                                        {...this.props}
                                        action={action}></ActionLink>
                                ))
                            }
                          </p>
                        {
                            _.get(this.props, 'pageContext.site.siteMetadata.footer.has_social', null) && (
                                <div className="social-links">
                                    {
                                        _.map(_.get(this.props, 'pageContext.site.siteMetadata.footer.social_links', null), (action, action_idx) => {
                                            return <ActionLink key={action_idx}
                                                {...this.props}
                                                action={action} />;
                                        })
                                    }
                                    </div>
                            )
                        }
                     </div>
                </div>
            </footer>
        );
    }
}
```
---

##

>   It's a React component that renders a form field based on the props passed to it */
/* It's a React component that renders a form field based on the props passed to it. */
import _ from 'lodash';
```jsx
import React from 'react';

export default class FormField extends React.Component {
        render() {
                const field = _.get(this.props, 'field');
                const inputType = _.get(field, 'input_type');
                const name = _.get(field, 'name');
                const defaultValue = _.get(field, 'default_value');
                const options = _.get(field, 'options');
                const required = _.get(field, 'is_required');
                const label = _.get(field, 'label');
                const labelId = `${name}-label`;
                const attr = {};
                if (label) {
                    attr['aria-labelledby'] = labelId;
                }
                if (required) {
                    attr.required = true;
                }

                switch (inputType) {
                    case 'checkbox':
                        return ( <
                                div className = "form-group form-checkbox" >
                                <
                                input type = "checkbox"
                                id = {
                                    name
                                }
                                name = {
                                    name
                                } {
                                    ...attr
                                }
                                /> {
                                    label && < label htmlFor = {
                                            name
                                        } > {
                                            label
                                        } < /label>} <
                                        /div>
                                );
                                case 'select':
                                return ( <
                                        div className = "form-group" > {
                                            label && < label htmlFor = {
                                                name
                                            } > {
                                                label
                                            } < /label>} <
                                            div className = "form-select-wrap" >
                                            <
                                            select id = {
                                                name
                                            }
                                            name = {
                                                name
                                            } {
                                                ...attr
                                            } > {
                                                defaultValue && < option value = "" > {
                                                    defaultValue
                                                } < /option>} {
                                                    _.map(options, (option, index) => ( <
                                                        option key = {
                                                            index
                                                        }
                                                        value = {
                                                            option
                                                        } > {
                                                            option
                                                        } <
                                                        /option>
                                                    ))
                                                } <
                                                /select> <
                                                /div> <
                                                /div>
                                            );
                                            case 'textarea': return ( <
                                                div className = "form-group" > {
                                                    label && < label htmlFor = {
                                                        name
                                                    } > {
                                                        label
                                                    } < /label>} <
                                                    textarea name = {
                                                        name
                                                    }
                                                    id = {
                                                        name
                                                    }
                                                    rows = "7" {
                                                        ...(defaultValue ? {
                                                            placeholder: defaultValue
                                                        } : null)
                                                    } {
                                                        ...attr
                                                    }
                                                    /> <
                                                    /div>
                                                );
                                                default:
                                                return ( <
                                                    div className = "form-group" > {
                                                        label && < label htmlFor = {
                                                            name
                                                        } > {
                                                            label
                                                        } < /label>} <
                                                        input type = {
                                                            inputType
                                                        }
                                                        name = {
                                                            name
                                                        }
                                                        id = {
                                                            name
                                                        } {
                                                            ...(defaultValue ? {
                                                                placeholder: defaultValue
                                                            } : null)
                                                        } {
                                                            ...attr
                                                        }
                                                        /> <
                                                        /div>
                                                    );
                                                }
                                            }
                                        }/* It's a header component that renders a logo, a navbar, and a search bar. */
import _ from 'lodash';
```jsx
import React from 'react';
import {classNames, Link, withPrefix} from '../utils';
import ActionLink from './ActionLink';
import Submenu from './Submenu';
export default class Header extends React.Component {
    render() {
        return (
            <header id="masthead" className="site-header outer">
                <br/>
                <div className="inner">
                    <div className="site-header-inside">
                        <div className="site-branding">
                            {
                            _.get(this.props, 'pageContext.site.siteMetadata.header.logo_img', null) ? (
                                <p className="site-logo">
                                    <Link to={
                                        withPrefix(_.get(this.props, 'pageContext.site.siteMetadata.header.url', null) || '/')
                                    }>
                                        <img src={
                                                withPrefix(_.get(this.props, 'pageContext.site.siteMetadata.header.logo_img', null))
                                            }
                                            alt={
                                                _.get(this.props, 'pageContext.site.siteMetadata.header.logo_img_alt', null)
                                            }/>
                                    </Link>
                                </p>
                            ) : (
                                <p className="site-logo">
                                    <Link to={
                                        withPrefix(_.get(this.props, 'pageContext.site.siteMetadata.header.url', null) || '/')
                                    }>
                                        {
                                        _.get(this.props, 'pageContext.site.siteMetadata.header.title', null)
                                    } </Link>
                                </p>
                            )
                        } </div>
                        {
                        _.get(this.props, 'pageContext.site.siteMetadata.header.has_nav', null) && (
                            <React.Fragment>
                                <nav id="main-navigation" className="site-navigation" aria-label="Main Navigation">
                                    <div className="site-nav-inside">
                                        <button id="menu-close" className="menu-toggle">
                                            <span className="screen-reader-text">Open Menu</span>
                                            <span className="icon-close" aria-hidden="true"/>
                                        </button>
                                        <ul className="menu">
                                            {
                                            _.map(_.get(this.props, 'pageContext.site.siteMetadata.header.nav_links', null), (action, action_idx) => {
                                                let page_url = _.trim(_.get(this.props, 'pageContext.url', null), '/');
                                                let action_url = _.trim(_.get(action, 'url', null), '/');
                                                return (
                                                    <li key={action_idx}
                                                        className={
                                                            classNames('menu-item', {
                                                                'has-children': _.get(action, 'has_subnav', null) && _.get(action, 'subnav_links', null),
                                                                current: page_url === action_url,
                                                                'menu-button': _.get(action, 'style', null) !== 'link'
                                                            })
                                                    }>
                                                        <ActionLink { ...this.props }
                                                            action={action}/> {
                                                        _.get(action, 'has_subnav', null) && _.get(action, 'subnav_links', null) && (
                                                            <React.Fragment>
                                                                <button className="submenu-toggle">
                                                                    <span className="icon-angle-right" aria-hidden="true"/>
                                                                    <span className="screen-reader-text">Sub-menu</span>
                                                                </button>
                                                                <Submenu { ...this.props }
                                                                    submenu={
                                                                        _.get(action, 'subnav_links', null)
                                                                    }
                                                                    menu_class={'submenu'}
                                                                    page={
                                                                        this.props.pageContext
                                                                    }/>
                                                            </React.Fragment>
                                                        )
                                                    } </li>
                                                );
                                            })
                                        } </ul>
                                    </div>
                                </nav>
                                <button id="menu-open" className="menu-toggle">
                                    <span className="screen-reader-text">Close Menu</span>
                                    <span className="icon-menu" aria-hidden="true"/>
                                </button>
                            </React.Fragment>
                        )
                    } </div>
                </div>
                <>
                    <div id="sb-search-example">
                        <div className="sb-search-icon" id="myCustomSearchButtonID">
                            <i className="sb-icon"></i>
                            <p>Search</p>
                        </div>
                        <style dangerouslySetInnerHTML={
                            {__html: "\n\t\t@font-face {\n            font-family: font-sb;\n            src: url(https://api.searchbar.org/fonts/sb.eot?39450784);\n            src: url(https://api.searchbar.org/fonts/sb.eot?39450784#iefix) format('embedded-opentype'), url(https://api.searchbar.org/fonts/sb.woff?39450784) format('woff'), url(https://api.searchbar.org/fonts/?39450784) format('truetype'), url(https://api.searchbar.org/fonts/sb.svg?39450784#font-sb) format('svg');\n            font-weight: 400;\n            font-style: normal\n        }\n\n        #sb-search-example p {\n            font-family: sans-serif;\n            font-size: 18px;\n            line-height: 12px;\n\t        margin: 0;\n        }\n\n        #sb-search-example {\n            position: static;\n            top: 0;\n            width: auto;\n            place-content: center;\n            display: inline-block;\n            box-shadow: 0px 2px 4px rgba(190, 190, 190, 0.5);\n            border: solid 5px white;\n            border-radius: 100px;\n            flex-shrink: initial;\n            flex-grow: initial;\n        }\n\n\n        #sb-search-example .sb-icon {\n            font: normal normal 400 26px font-sb;\n            align-items: center;\n            padding: 10px;\n            speak: none;\n            display: inline-block;\n            text-decoration: inherit;\n            text-align: center;\n            text-transform: none;\n            cursor: pointer;\n            margin: 0;\n        }\n\n        #sb-search-example .sb-search-icon {\n            box-sizing: border-box;\n            border: 0px;\n            align-items: center;\n            background: #007cff;\n            color: #fff;\n            cursor: pointer;\n            display: flex;\n            border-radius: 26px;\n            padding: 0 20px 0 4px;\n        }\n\t"}
                        }/>
                    </div>
                </>

                <a className="github-corner" href="https://github.com/bgoonz/BGOONZ_BLOG_2.0" aria-label="View source on Github">
                    <svg aria-hidden="true"
                        width={30}
                        height={30}
                        viewBox="0 0 250 250"
                        style={
                            {
                                zIndex: 100000,
                                fill: 'black',
                                color: '#fff',
                                position: 'fixed',
                                top: '0px',
                                border: 1,
                                left: '0px',
                                transform: 'scale(-1.5, 1.5)'
                            }
                    }>
                        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                        <path className={"octo-arm"}
                            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                            fill="currentColor"
                            style={
                                {transformOrigin: '130px 106px'}
                        }></path>
                        <path className="octo-body" d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor"></path>
                    </svg>
                </a>
            </header>
        );
    }
}
import _ from 'lodash';
```jsx
import React from 'react';

export default class Icon extends React.Component {
    render() {
        let icon = _.get(this.props, 'icon', null);
        return (
            <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {icon === 'dev' ? (
                    <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z" />
                ) : icon === 'facebook' ? (
                    <path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z" />
                ) : icon === 'github' ? (
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                ) : icon === 'instagram' ? (
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 001.384 2.126A5.868 5.868 0 004.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 002.126-1.384 5.86 5.86 0 001.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 00-1.384-2.126A5.847 5.847 0 0019.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 01-.899 1.382 3.744 3.744 0 01-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 01-1.379-.899 3.644 3.644 0 01-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z" />
                ) : icon === 'linkedin' ? (
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                ) : icon === 'pinterest' ? (
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                ) : icon === 'reddit' ? (
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                ) : icon === 'twitter' ? (
                    <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                ) : icon === 'youtube' ? (
                    <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                ) : (
                    icon === 'vimeo' && (
                        <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197a315.065 315.065 0 003.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z" />
                    )
                )}
            </svg>
        );
    }
}
```
---

##

>   The Body class is a React component that renders the page's body */
import _ from "lodash";
```jsx
import React from "react";
import { Helmet } from "react-helmet";
import "../sass/main.scss";
import { attribute, withPrefix } from "../utils";
import Footer from "./Footer";
import Header from "./Header";
export default class Body extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title> {
                        _.get(this.props, "pageContext.frontmatter.seo.title", null) ? _.get(this.props, "pageContext.frontmatter.seo.title", null) : _.get(this.props, "pageContext.frontmatter.title", null) + " | " + _.get(this.props, "pageContext.site.siteMetadata.title", null)
                    } </title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initialScale=1.0"/>
                    <meta name="google-site-verification" content="q5W83EYchlVTyA-iYRE4ElQGcbD_vukQF0NKW12N3qU"/>
                    <meta charset="UTF-8"/>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <link rel="apple-touch-icon" href="logo-circle.png"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta http-equiv="Content-Type" content="HTML"/>
                    <meta name="Author" content="Bryan Guner"/>
                    <meta name="keywords" content="HTML, Meta Tags, Metadata"/>
                    <meta http-equiv="Content-Type" content="text/html; charset=us-ascii"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>
                    <meta name="twitter:card" content="summary"/>
                    <meta name="twitter:site" content="@bgoonz"/>
                    <meta name="twitter:creator" content="@bgoonz"/>
                    <meta name="twitter:image:src" content="/logo-circle.png"/>
                    <meta name="twitter:title" content="Web Development Resource Hub Bryan Guner"/>
                    <meta property="twitter:card" content="summary_large_image"/>
                    <link href="https://instructure-uploads-pdx.s3.us-west-2.amazonaws.com/account_168550000000000001/attachments/537/logo-canvas.png" rel="apple-touch-icon"/>
                    <link type="text/css" href="https://fonts.googleapis.com/css?family=Raleway:200,100,400" rel="stylesheet"/>
                    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
                    <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initialScale=1.0"/>
                    <meta name="description"
                        content={
                            _.get(this.props, "pageContext.frontmatter.seo.description", null) || ""
                        }/> {
                    _.get(this.props, "pageContext.frontmatter.seo.robots", null) && (
                        <meta name="robots"
                            content={
                                _.join(_.get(this.props, "pageContext.frontmatter.seo.robots", null), ",")
                            }/>
                    )
                }
                    {
                    _.map(_.get(this.props, "pageContext.frontmatter.seo.extra", null), (meta, meta_idx) => {
                        let key_name = _.get(meta, "keyName", null) || "name";
                        return _.get(meta, "relativeUrl", null) ? (_.get(this.props, "pageContext.site.siteMetadata.domain", null) && (() => {
                            let domain = _.trim(_.get(this.props, "pageContext.site.siteMetadata.domain", null), "/");
                            let rel_url = withPrefix(_.get(meta, "value", null));
                            let full_url = domain + rel_url;
                            return (
                                <meta key={meta_idx}
                                    {...attribute(key_name, _.get(meta, "name", null))}
                                    content={full_url}/>
                            );
                        })()) : (
                            <meta key={
                                    meta_idx + ".1"
                                }
                                {...attribute(key_name, _.get(meta, "name", null))}
                                content={
                                    _.get(meta, "value", null)
                                }/>
                        );
                    })
                }
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/> {
                    _.get(this.props, "pageContext.site.siteMetadata.favicon", null) && (
                        <link rel="icon"
                            href={
                                withPrefix(_.get(this.props, "pageContext.site.siteMetadata.favicon", null))
                            }/>
                    )
                }
                    <body className={
                        "palette-" + _.get(this.props, "pageContext.site.siteMetadata.palette", null)
                    }/>
                </Helmet>
                <div id="page" className="site">
                    <Header {...this.props}/>
                    <main id="content" className="site-content">
                  
                        {
                        this.props.children
                    } </main>
                    <Footer {...this.props}/>


                </div>
            </React.Fragment>
        );
    }
}
import _ from 'lodash';
```jsx
import React from 'react';
import { classNames, markdownify, withPrefix } from '../utils';
import CtaButtons from './CtaButtons';
export default class SectionContent extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        return (
            <section id={_.get(section, 'section_id', null)} className="block block-text outer">
                <div className="outter">
                    <div
                        className={classNames('inner', {
                            'grid-swap': _.get(section, 'image', null) && _.get(section, 'image_position', null) === 'right'
                        })}
                    >
                        {_.get(section, 'image', null) && (
                            <div className="grid-item block-image">
                                <img src={withPrefix(_.get(section, 'image', null))} alt={_.get(section, 'image_alt', null)} />
                            </div>
                        )}
                        <div>
                            {_.get(section, 'title', null) && (
                                <div className="block-header">
                                    <h2 className="block-title">{_.get(section, 'title', null)}</h2>
                                </div>
                            )}
                            {_.get(section, 'content', null) && <div className="outer">{markdownify(_.get(section, 'content', null))}</div>}
                            {_.get(section, 'actions', null) && (
                                <div className="block-buttons">
                                    <CtaButtons {...this.props} actions={_.get(section, 'actions', null)} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
```jsx
import React from 'react';
import _ from 'lodash';

import {htmlToReact} from '../utils';
import CtaButtons from './CtaButtons';

export default class SectionCta extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        return (
            <section id={_.get(section, 'section_id', null)} className="block block-cta outer">
              <div className="inner">
                <div className="has-gradient">
                  <div className="grid grid-middle grid-center">
                    {(_.get(section, 'title', null) || _.get(section, 'subtitle', null)) && (
                    <div className="grid-item block-header">
                      {_.get(section, 'title', null) && (
                      <h2 className="block-title">{_.get(section, 'title', null)}</h2>
                      )}
                      {_.get(section, 'subtitle', null) && (
                      <p className="block-subtitle">{htmlToReact(_.get(section, 'subtitle', null))}</p>
                      )}
                    </div>
                    )}
                    {_.get(section, 'actions', null) && (
                    <div className="grid-item block-buttons">
                      <CtaButtons {...this.props} actions={_.get(section, 'actions', null)} />
                    </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
        );
    }
}
import _ from 'lodash';
```jsx
import React from 'react';
import { classNames, getPage, htmlToReact, Link, pathJoin, withPrefix } from '../utils';
export default class SectionDocs extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        return (
            <section
                id={_.get(section, 'section_id', null)}
                className={classNames('block', 'block-grid', 'outer', {
                    'has-header': _.get(section, 'title', null) || _.get(section, 'subtitle', null)
                })}
            >
                <div className="inner">
                    {(_.get(section, 'title', null) || _.get(section, 'subtitle', null)) && (
                        <div className="block-header inner-sm">
                            {_.get(section, 'title', null) && <h2 className="block-title">{_.get(section, 'title', null)}</h2>}
                            {_.get(section, 'subtitle', null) && <p className="block-subtitle">{htmlToReact(_.get(section, 'subtitle', null))}</p>}
                        </div>
                    )}
                    <div className="block-content">
                        <div
                            className={classNames('grid', {
                                'grid-col-2': _.get(section, 'col_number', null) === 'two',
                                'grid-col-3': _.get(section, 'col_number', null) === 'three'
                            })}
                        >
                            {_.map(_.get(this.props, 'pageContext.site.data.doc_sections.sections', null), (doc_section, doc_section_idx) => {
                                let doc_section_path = pathJoin(_.get(this.props, 'pageContext.site.data.doc_sections.root_docs_path', null), doc_section);
                                let doc_section_page = getPage(this.props.pageContext.pages, doc_section_path);
                                return (
                                    <div key={doc_section_idx} className="grid-item">
                                        <div className="grid-item-inside">
                                            <h3 className="grid-item-title line-left">
                                                <Link to={withPrefix(_.get(doc_section_page, 'url', null))}>
                                                    {_.get(doc_section_page, 'frontmatter.title', null)}
                                                </Link>
                                            </h3>
                                            {_.get(doc_section_page, 'frontmatter.excerpt', null) && (
                                                <div className="grid-item-content">
                                                    <p>{htmlToReact(_.get(doc_section_page, 'frontmatter.excerpt', null))}</p>
                                                </div>
                                            )}
                                            <div className="grid-item-buttons">
                                                <Link to={withPrefix(_.get(doc_section_page, 'url', null))}>Learn More</Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
```
---

##

>   It renders a section with a title, subtitle, and a grid of items */

import _ from 'lodash';
```jsx
import React from 'react';
import { classNames, htmlToReact, Link, markdownify, withPrefix } from '../utils';
import CtaButtons from './CtaButtons';
export default class SectionGrid extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        return (
            <section id={_.get(section, 'section_id', null)} className={classNames('block', 'block-grid', 'outer', {'has-header': _.get(section, 'title', null) || _.get(section, 'subtitle', null)})}>
              <div className="inner">
                {(_.get(section, 'title', null) || _.get(section, 'subtitle', null)) && (
                <div className="block-header inner-sm">
                  {_.get(section, 'title', null) && (
                  <h2 className="block-title">{_.get(section, 'title', null)}</h2>
                  )}
                  {_.get(section, 'subtitle', null) && (
                  <p className="block-subtitle">{htmlToReact(_.get(section, 'subtitle', null))}</p>
                  )}
                </div>
                )}
                {_.get(section, 'grid_items', null) && (
                <div className="block-content">
                  <div className={classNames('grid', {'grid-col-2': _.get(section, 'col_number', null) === 'two', 'grid-col-3': _.get(section, 'col_number', null) === 'three'})}>
                    {_.map(_.get(section, 'grid_items', null), (item, item_idx) => (
                    <div key={item_idx} className="grid-item">
                      <div className="grid-item-inside">
                        {_.get(item, 'image', null) && (
                        <div className="grid-item-image">
                          <img src={withPrefix(_.get(item, 'image', null))} alt={_.get(item, 'image_alt', null)} />
                        </div>
                        )}
                        {_.get(item, 'title', null) && (
                        <h3 className="grid-item-title line-left">
                          {_.get(item, 'title_url', null) ? (
                          <Link to={withPrefix(_.get(item, 'title_url', null))}>{_.get(item, 'title', null)}</Link>
                          ) : 
                          _.get(item, 'title', null)
                          }
                        </h3>
                        )}
                        {_.get(item, 'content', null) && (
                        <div className="grid-item-content">
                          {markdownify(_.get(item, 'content', null))}
                        </div>
                        )}
                        {_.get(item, 'actions', null) && (
                        <div className="grid-item-buttons">
                          <CtaButtons {...this.props} actions={_.get(item, 'actions', null)} />
                        </div>
                        )}
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
                )}
              </div>
            </section>
        );
    }
}
```jsx
import React from 'react';
import _ from 'lodash';

import {toStyleObj, withPrefix, markdownify} from '../utils';
import CtaButtons from './CtaButtons';

export default class SectionHero extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        return (
            <section id={_.get(section, 'section_id', null)} className="block block-hero has-gradient outer">
              {_.get(section, 'image', null) && (
              <div className="bg-img" style={toStyleObj('background-image: url(\'' + withPrefix(_.get(section, 'image', null)) + '\')')}/>
              )}
              <div className="inner-sm">
                {_.get(section, 'title', null) && (
                <div className="block-header">
                  <h1 className="block-title">{_.get(section, 'title', null)}</h1>
                </div>
                )}
                {_.get(section, 'content', null) && (
                <div className="block-content">
                  {markdownify(_.get(section, 'content', null))}
                </div>
                )}
                {_.get(section, 'actions', null) && (
                <div className="block-buttons">
                  <CtaButtons {...this.props} actions={_.get(section, 'actions', null)} />
                </div>
                )}
              </div>
            </section>
        );
    }
}
```jsx
import React from 'react';
import _ from 'lodash';

import {classNames} from '../utils';
import ActionLink from './ActionLink';

export default class Submenu extends React.Component {
    render() {
        let page = _.get(this.props, 'page', null);
        return (
            <ul className={_.get(this.props, 'menu_class', null)}>
            {_.map(_.get(this.props, 'submenu', null), (action, action_idx) => {
                let page_url = _.trim(_.get(page, 'url', null), '/');
                let action_url = _.trim(_.get(action, 'url', null), '/');
                return (
                  <li key={action_idx} className={classNames('menu-item', {'current': page_url === action_url, 'menu-button': _.get(action, 'style', null) !== 'link'})}>
                    <ActionLink {...this.props} action={action} />
                  </li>
                )
            })}
            </ul>
        );
    }
}
//# sourceMappingURL=appendir.js.map
let fs = require( 'fs' );
let path = require( 'path' );
let cat = require( 'child_process' ).execSync( 'cat *' ).toString( 'UTF-8' );
let file = path.join( __dirname, 'appendir.txt' );
fs.writeFile( 'output.md', cat, ( err ) => {
    if ( err ) throw err;
    console.log( 'The file has been saved!' );
} );
fs.appendFile( file, cat, ( err ) => {
    if ( err ) throw err;
    console.log( 'The file has been saved!' );
} );
/* Exporting all the components in the folder. */
import ActionLink from './ActionLink';
import CtaButtons from './CtaButtons';
import DocsMenu from './DocsMenu';
import DocsSubmenu from './DocsSubmenu';
import Footer from './Footer';
import Header from './Header';
import Icon from './Icon';
import Layout from './Layout';
import SectionContent from './SectionContent';
import SectionCta from './SectionCta';
import SectionDocs from './SectionDocs';
import SectionGrid from './SectionGrid';
import SectionHero from './SectionHero';
import Submenu from './Submenu';
export {
    ActionLink,
    CtaButtons,
    DocsMenu,
    DocsSubmenu,
    Footer,
    Header,
    Icon,
    SectionContent,
    SectionCta,
    SectionDocs,
    SectionGrid,
    SectionHero,
    Submenu,
    Layout
};
export default {
    ActionLink,
    CtaButtons,
    DocsMenu,
    DocsSubmenu,
    Footer,
    Header,
    Icon,
    SectionContent,
    SectionCta,
    SectionDocs,
    SectionGrid,
    SectionHero,
    Submenu,
    Layout
};
