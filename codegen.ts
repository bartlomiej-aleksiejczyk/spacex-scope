import { CodegenConfig } from '@graphql-codegen/cli';
import {API_LINK} from "./src/graphql/graphqlConsts";

const config: CodegenConfig = {
    schema: API_LINK,
    documents: ['src/**/*.{ts,tsx}'],
    generates: {
        './src/__generated__/': {
            preset: 'client',
            plugins: [],
            presetConfig: {
                gqlTagName: 'gql',
            }
        }
    },
    ignoreNoDocuments: true,
};

export default config;