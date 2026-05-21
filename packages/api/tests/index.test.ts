import { getLinodeInstance, GetLinodeInstanceResponse } from "../src";
import { http, HttpResponse } from 'msw'
import { server } from "./msw";
import { zPostLinodeInstanceBody } from '../src';
import { describe, test, expect, expectTypeOf } from "bun:test";

describe("TypeScript types", () => {
  test("return type when fetching a Linode", async () => {
    const mockLinode = { id: 1, label: 'linode-1' } as GetLinodeInstanceResponse;

    server.use(
      http.get('https://api.linode.com/v4/linode/instances/:id', () => {
        return HttpResponse.json(mockLinode);
      })
    )

    const linode = await getLinodeInstance({ path: { linodeId: 1 } });

    expect(linode).toStrictEqual(mockLinode);
    expectTypeOf(linode).toExtend<{ id: number, label: string }>();
  });

  test("can override the base URL", async() => {
    getLinodeInstance({
      baseUrl: 'https://api.linode.com/v4beta',
      path: {
        linodeId: 0
      }
    })
  });
});


describe("Validation Schemas", () => {
  test("should not throw if all required params as passed", () => {
    const payload = { region: 'us-east', type: 'g6-standard-1' };

    expect(() => zPostLinodeInstanceBody.parse(payload)).not.toThrow();
  });

  test("should throw if required params are missing", () => {
    const payload = { type: 'g6-standard-1' };

    const { error } = zPostLinodeInstanceBody.safeParse(payload);

    expect(error).toBeDefined();

    const regionFieldError = error?.issues.find(issue => issue.path[0] === 'region');

    expect(regionFieldError).toBeDefined();

    expect(regionFieldError?.message).toBe('Invalid input: expected string, received undefined');

    // Region is the only other required field
    expect(error?.issues).toHaveLength(1);
  });
});
