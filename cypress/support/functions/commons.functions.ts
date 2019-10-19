// tslint:disable: jsdoc-format
import { Config } from '../domain/config'
import { IPageData } from '../pages_data/page-data'
import { StubbedAPI } from '../pages_data/stubbed-api'

/**
 * Visit Page Object
 */
export function visit(pd: IPageData): void {
    cy.visit(pd.url)
}

/**
 * Prepare api for execution
 */
export function findStubbedApiByName(name: string, pd: IPageData): StubbedAPI {
    const api = Cypress._.find(pd.apis, { name })
    return api
}

/**
 * Prepare api for execution
 */
export function stubApiByName(name: string, pd: IPageData): void {
    const api = findStubbedApiByName(name, pd)
    routeStubbedApi({ api })
}

/**
 * Stub the apis from the IPageData with the fixtures configured
 */
export function stubAllAPIs(pd: IPageData): void {
    pd.apis.map((api) => (    routeStubbedApi({ api })))
}

/**
 * A Wrapper to wait for a given StubbedAPI to return using cypress wait method
 *
 * @see StubbedAPI
 * @see https://on.cypress.io/wait
 * @param api - StubbedAPI that will be used.
 * @param message - Message that will be shown once api returns.
 * @param assertionFunction - Function that will be called after api returns,
 *  it will expose the xhr object for assertion
 * @param log - Enable/Disable logging for cypress runner
 * @param timeout - Amount of time that will be waited for the api to return
 * @example
 ```
         commons.waitForStubbedApi({
           api,
           assertionFunction: (xhr: any) => {
              expect(xhr.url).to.include('pizza.flavour=Pepperoni')
           },
           message: 'API call has data',
        })
```
 */
export function waitForStubbedApi({
    api,
    message,
    assertionFunction,
    log = true,
    timeout = 30000}:
    {
        api: StubbedAPI;
        message?: string;
        assertionFunction?: (xhr: any) => void;
        log?: boolean;
        timeout?: number;
    }): void {

    cy.wait(`@${api.name}`, { log, timeout }).then((xhr: any) => {
        if (xhr) {
            const requestBody = xhr.request ? xhr.request.body : null
            const responseBody = xhr.response.body
            const messageValue = message ? message : 'Api response should not be null'
            assert.isNotNull(responseBody, messageValue)
        }
        if (assertionFunction) {
            assertionFunction(xhr)
        }
    })

}

/**
 * Prepare api for execution
 */
export function routeStubbedApi({
    api,
    force404 = false,
}: {
    api: StubbedAPI;
    force404?: boolean;
}): Cypress.Chainable<null> {
    let status = 200
    if (force404) {
        status = 404
    } else if (api.status) {
        status = api.status
    }

    // tslint:disable-next-line: prefer-const
    let routeParams = {
        force404,
        method: api.method as Cypress.HttpMethod,
        response: `fixture:${api.response}`,
        status,
        url: api.regex,
    }

    if (isStubsDisabled()) {
        delete routeParams.response
        delete routeParams.force404
        delete routeParams.status
    }

    return cy.route(routeParams).as(api.name)
}


export function getConfig(name: any) {
    return Cypress.config(name)
}

export function setConfig(name: any, value: any) {
    return Cypress.config(name, value)
}

export function disableStubsConfig() {
    return setConfig(Config.DISABLE_STUBS, true)
}

export function isStubsDisabled() {
    return Cypress.config(Config.DISABLE_STUBS as any)
}
