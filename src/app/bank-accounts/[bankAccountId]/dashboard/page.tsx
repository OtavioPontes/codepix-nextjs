import { CardAction } from "@/components/CardAction";
import { CurrentBalance } from "@/components/CurrentBalance";
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { MyLatestTransactions } from "./MyLatestTransactions";
import Link from "next/link";

export async function getTransactions(bankAccountId: string) {
  const response = await fetch(
    `http://host.docker.internal:3000/bank-accounts/${bankAccountId}/transactions`,
    {
      next: {
        revalidate: 10,
        tags: [`bank-accounts/${bankAccountId}`],
      },
    }
  );

  return response.json();
}

export async function BankAccountDashboardPage({
  params,
}: {
  params: { bankAccountId: string };
}) {
  const transactions = await getTransactions(params.bankAccountId);
  return (
    <Grid2 container spacing={2}>
      <Grid2 xs={12} lg={6} spacing={1}>
        <div>
          <CurrentBalance bankAccountId={params.bankAccountId}></CurrentBalance>
        </div>
      </Grid2>
      <Grid2 container xs={12} lg={6}>
        <Grid2 xs={6}>
          <Link
            style={{ textDecoration: "none" }}
            href={`/bank-accounts/${params.bankAccountId}/withdraw`}
          >
            <CardAction sx={{ display: "flex", alignItems: "center" }}>
              <Typography component="span" color={"primary"}>
                Transferência
              </Typography>
            </CardAction>
          </Link>
        </Grid2>
        <Grid2 xs={6}>
          <Link
            style={{ textDecoration: "none" }}
            href={`/bank-accounts/${params.bankAccountId}/pix`}
          >
            <CardAction sx={{ display: "flex", alignItems: "center" }}>
              <Typography component="span" color={"primary"}>
                Nova Chave Pix
              </Typography>
            </CardAction>
          </Link>
        </Grid2>
      </Grid2>
      <Grid2 xs={12}>
        <Typography variant="h5">Últimos lançamentos</Typography>
        <MyLatestTransactions
          transactions={transactions}
        ></MyLatestTransactions>
      </Grid2>
    </Grid2>
  );
}

export default BankAccountDashboardPage;
