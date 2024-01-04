import { getLinodeAPI } from './v4';

const api = getLinodeAPI();

const linodeVolumes = api.getLinodeVolumes(1, { page: 1 }, { '+or': [{ label: "test" }] });
