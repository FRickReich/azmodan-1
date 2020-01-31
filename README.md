# Azmodan

An end-to-end testing module driven by puppeteer and the magic of mocha.

Azmodan is an end-to-end testing module to be used in unison with mocha, using puppeteer and step definitions in yaml.

## Install

```bash
npm install @opuscapita/azmodan
```

## Usage

require the module with

```js
const azmodan = require("azmodan");
```

In one of your projects mocha test files, require azmodan before or after the describe block.

```js
azmodan();
```

### Configuration

Azmodan also takes the following options when called:

-   headless (boolean): Runs azmodan in headless mode. Defaults to `true`.
-   nodelay (boolean): Overwrites the delays set in the case definitions. Defaults to `false`.
-   timeout (number): Sets the maximum timeout for steps to be performed. Defaults to `5000`.
-   caseFolder (string): The folder in which the case-files are located. Defaults to `./test/cases`.

```js
azmodan({
    headless: true,
    nodelay: false,
    timeout: 10000,
    caseFolder: "./test/cases"
});
```

### Prequesites

To run azmodan cases, you need to create a `cases` directory inside of your tests directory, right where you normally write your unit tests.

### Creating case files

Inside of the `cases` directory, create a yaml file for each case definition.

**A typical Case-File looks like this:**

_google.yaml_

```yaml
title: "google search"
steps:
    - type: "visit"
      url: "https://www.google.com/"
      description: "should visit the google homepage"

    - type: "fill"
      target: "input[name=q]"
      content: "Hello world"
      delay: 5000

    - type: "press"
      key: "Enter"
      delay: 5000
```

#### title

This is the title of the test-case, as it will show up in mocha.

#### steps

Steps define the workflow of azmodan, and contain all informations needed to run the tests.

**type: visit**

options:

| Title | Type   | Required | Description                       |
| ----- | ------ | -------- | --------------------------------- |
| url   | string | true     | Url to be visited by the browser. |

**type: fill**

options:

| Title   | Type   | Required | Description                                  |
| ------- | ------ | -------- | -------------------------------------------- |
| target  | string | true     | Target element on page to be filled.         |
| content | string | false    | Content to be filled into the target object. |

**type: click**

options:

| Title  | Type   | Required | Description                           |
| ------ | ------ | -------- | ------------------------------------- |
| target | string | true     | Target element on page to be clicked. |

**type: press**

options:

| Title | Type   | Required | Description        |
| ----- | ------ | -------- | ------------------ |
| key   | string | true     | Key to be pressed. |

**All types also share these options:**

| Title       | Type   | Required | Description                                                     |
| ----------- | ------ | -------- | --------------------------------------------------------------- |
| description | string | false    | Custom description of the step, overrides Azmodans descriptions |
| delay       | number | false    | Optional delay in milliseconds before action will be performed. |

It is also possible to pass environment variables into step definitions, like `${THIS}`.
