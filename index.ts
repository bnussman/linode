import orval from 'orval';
import yaml from 'yaml';
// @ts-expect-error they don't publish types
import resolver from 'oas-resolver';

const SPEC_URL = "https://raw.githubusercontent.com/linode/linode-api-docs/development/openapi.yaml";

const data = await fetch(SPEC_URL);

const spec = await data.text();

const input = yaml.parse(spec);

const resolvedSpec = await resolver.resolve(input, SPEC_URL, { resolve: true, resolveInternal: true });

await Bun.write("./openapi.yaml", yaml.stringify(resolvedSpec.openapi));

orval();
