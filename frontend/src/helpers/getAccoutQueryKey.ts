export default function getAccountQueryKey(accountId: number) {
  return `queries.ACCOUNTS/${accountId}`;
}
