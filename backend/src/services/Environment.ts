export const getEnvironmentVariable = (name: string): string => {
  const readValue = process.env[name];
  if (!readValue) throw new Error(`Environment variable ${name} is not set`);
  return readValue;
};

export const getEnvironmentVariableAsNumber = (name: string): number => {
  const readValue = Number(process.env[name]);
  if (!readValue) {
    throw new Error(
      `Environment variable ${name} is not set or is not a number`
    );
  }
  return readValue;
};

export const getEnvironmentVariableAsBoolean = (name: string): boolean => {
  const readValue = process.env[name];

  if (readValue === "true") {
    return true;
  } else if (readValue === "false") {
    return false;
  } else {
    throw new Error(
      `Environment variable ${name} is not set or is not "true" or "false"`
    );
  }
};

export const getOptionalEnvironmentVariable = (
  name: string
): string | undefined => {
  return process.env[name];
};
