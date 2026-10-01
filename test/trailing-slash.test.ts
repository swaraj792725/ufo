import { describe, expect, test } from "vitest";
import {
  hasTrailingSlash,
  withTrailingSlash,
  withoutTrailingSlash,
} from "../src";

describe("withTrailingSlash, queryParams: false", () => {
  const tests = {
    "": "/",
    bar: "bar/",
    "bar#abc": "bar#abc/",
    "bar/": "bar/",
    "foo?123": "foo?123/",
    "foo/?123": "foo/?123/",
    "foo/?123#abc": "foo/?123#abc/",
  };

  for (const input in tests) {
    test(input, () => {
      expect(withTrailingSlash(input)).toBe(tests[input]);
    });
  }

  test("falsy value", () => {
    expect(withTrailingSlash()).toBe("/");
  });
});

describe("withTrailingSlash, queryParams: true", () => {
  const tests = {
    "": "/",
    bar: "bar/",
    "bar/": "bar/",
    "foo?123": "foo/?123",
    "foo/?123": "foo/?123",
    "foo?123#abc": "foo/?123#abc",
    "/foo?redirect=/bar/": "/foo/?redirect=/bar/",
    "/foo#/bar/": "/foo/#/bar/",
    "/foo?redirect=/?a=1": "/foo/?redirect=/?a=1",
    "/foo#/#bar": "/foo/#/#bar",
    "/foo/?redirect=/bar/": "/foo/?redirect=/bar/",
    "/foo/#/bar/": "/foo/#/bar/",
    "/#abc": "/#abc",
    "#abc": "#abc",
    "#": "#",
  };

  for (const input in tests) {
    test(input, () => {
      expect(withTrailingSlash(input, true)).toBe(tests[input]);
    });
  }

  test("falsy value", () => {
    expect(withTrailingSlash()).toBe("/");
  });
});

describe("withoutTrailingSlash, queryParams: false", () => {
  const tests = {
    "": "/",
    "/": "/",
    bar: "bar",
    "bar#abc": "bar#abc",
    "bar/#abc": "bar/#abc",
    "foo?123": "foo?123",
    "foo/?123": "foo/?123",
    "foo/?123#abc": "foo/?123#abc",
    "foo/?k=v": "foo/?k=v",
    "foo/?k=/": "foo/?k=",
  };

  for (const input in tests) {
    test(input, () => {
      expect(withoutTrailingSlash(input)).toBe(tests[input]);
    });
  }

  test("falsy value", () => {
    expect(withoutTrailingSlash()).toBe("/");
  });
});

describe("withoutTrailingSlash, queryParams: true", () => {
  const tests = {
    "": "/",
    "/": "/",
    bar: "bar",
    "bar/": "bar",
    "bar#abc": "bar#abc",
    "bar/#abc": "bar#abc",
    "foo?123": "foo?123",
    "foo/?123": "foo?123",
    "foo/?123#abc": "foo?123#abc",
    "foo/?k=123": "foo?k=123",
    "foo?k=/": "foo?k=/",
    "foo/?k=/": "foo?k=/",
    "foo/?k=/&x=y#abc": "foo?k=/&x=y#abc",
    "/foo/?redirect=/bar/": "/foo?redirect=/bar/",
    "/foo/#/bar/": "/foo#/bar/",
    "/foo?redirect=/bar/": "/foo?redirect=/bar/",
    "/foo#/bar/": "/foo#/bar/",
    "/a/#abc": "/a#abc",
    "/#abc": "/#abc",
  };

  for (const input in tests) {
    test(input, () => {
      expect(withoutTrailingSlash(input, true)).toBe(tests[input]);
    });
  }

  test("falsy value", () => {
    expect(withoutTrailingSlash()).toBe("/");
  });
});

describe("hasTrailingSlash", () => {
  test("queryParams: false", () => {
    expect(hasTrailingSlash("")).toBe(false);
    expect(hasTrailingSlash("/")).toBe(true);
    expect(hasTrailingSlash("/foo")).toBe(false);
    expect(hasTrailingSlash("/foo/")).toBe(true);
    expect(hasTrailingSlash("/foo?query=true")).toBe(false);
    expect(hasTrailingSlash("/foo/?query=true")).toBe(false);
    expect(hasTrailingSlash("/foo?redirect=/bar/")).toBe(true);
    expect(hasTrailingSlash("/foo#/bar/")).toBe(true);
  });

  test("queryParams: true", () => {
    expect(hasTrailingSlash("", true)).toBe(false);
    expect(hasTrailingSlash("/", true)).toBe(true);
    expect(hasTrailingSlash("/foo", true)).toBe(false);
    expect(hasTrailingSlash("/foo/", true)).toBe(true);
    expect(hasTrailingSlash("/foo?query=true", true)).toBe(false);
    expect(hasTrailingSlash("/foo/?query=true", true)).toBe(true);
    expect(hasTrailingSlash("/foo?redirect=/bar/", true)).toBe(false);
    expect(hasTrailingSlash("/foo/?redirect=/bar/", true)).toBe(true);
    expect(hasTrailingSlash("/foo#/bar/", true)).toBe(false);
    expect(hasTrailingSlash("/foo/#/bar/", true)).toBe(true);
    expect(hasTrailingSlash("/foo?redirect=/?a=1", true)).toBe(false);
    expect(hasTrailingSlash("/foo/?redirect=/?a=1", true)).toBe(true);
    expect(hasTrailingSlash("/foo#/#bar", true)).toBe(false);
    expect(hasTrailingSlash("/foo/#/#bar", true)).toBe(true);
  });
});
