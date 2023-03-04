import { JsonSerializer, throwError } from 'typescript-json-serializer';

// Instantiate a default serializer
export const defaultSerializer = new JsonSerializer();

// Or you can instantiate a serializer with your custom options
export const customSerializer = new JsonSerializer({
    // Throw errors instead of logging
    errorCallback: throwError,

    // Allow all nullish values
    nullishPolicy: {
        undefined: 'allow',
        null: 'allow'
    },

    // Disallow additional properties (non JsonProperty)
    additionalPropertiesPolicy: 'disallow',

    // e.g. if all the properties in the json object are prefixed by '_'
    // formatPropertyName: (propertyName: string) => `_${propertyName}`
})

// Deserialize
// const organization = defaultSerializer.deserialize(json, Organization);

// Serialize
// const data = defaultSerializer.serialize(organization);