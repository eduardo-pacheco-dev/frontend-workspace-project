import { createFileRoute, Link } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

interface Company {
  id: number
  name: string
  cnpj: string
  tradeName: string
  openingDate: string
  companySize: string
  registrationStatus: string
  address: string
  phone: string
  email: string
}

const companies: Company[] = [
  { id: 1, name: 'Acme Technology LLC', cnpj: '12.345.678/0001-95', tradeName: 'Acme Tech', openingDate: '2020-01-15', companySize: 'LLC', registrationStatus: 'Active', address: '123 Main Street, Suite 100, São Paulo, SP', phone: '+55 11 99999-1234', email: 'contact@acmetech.com.br' },
  { id: 2, name: 'Globex Corporation', cnpj: '98.765.432/0001-10', tradeName: 'Globex', openingDate: '2018-06-22', companySize: 'Corporation', registrationStatus: 'Active', address: '456 Oak Avenue, Rio de Janeiro, RJ', phone: '+55 21 98888-5678', email: 'info@globexcorp.com.br' },
  { id: 3, name: 'Initech Solutions Ltda', cnpj: '45.678.901/0001-23', tradeName: 'Initech', openingDate: '2022-03-01', companySize: 'Ltda', registrationStatus: 'Pending', address: '789 Pine Road, Belo Horizonte, MG', phone: '+55 31 97777-9012', email: 'contact@initech.com.br' },
  { id: 4, name: 'Umbrella Holdings S.A.', cnpj: '11.222.333/0001-44', tradeName: 'Umbrella', openingDate: '2015-11-30', companySize: 'SA', registrationStatus: 'Active', address: '321 Cedar Lane, Curitiba, PR', phone: '+55 41 96666-3456', email: 'admin@umbrella.com.br' },
  { id: 5, name: 'Stark Industries Brasil', cnpj: '55.666.777/0001-88', tradeName: 'Stark BR', openingDate: '2023-07-10', companySize: 'LLC', registrationStatus: 'Inactive', address: '654 Maple Drive, Porto Alegre, RS', phone: '+55 51 95555-7890', email: 'contact@starkbr.com.br' },
]

export const Route = createFileRoute('/_authenticated/admin/management/companies/$companyId')({
  component: CompanyDetailPage,
})

function CompanyDetailPage() {
  const { companyId } = Route.useParams()
  const id = Number(companyId)
  const company = companies.find((c) => c.id === id)

  if (!company) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Company not found
        </Typography>
        <Button component={Link} to="/admin/management" variant="outlined" sx={{ borderRadius: 999 }}>
          Back to management
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3 }}>
        <Button
          component={Link}
          to="/admin/management"
          variant="text"
          sx={{ borderRadius: 999, minWidth: 0, px: 1 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Button>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {company.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {company.tradeName} · {company.cnpj}
          </Typography>
        </Box>
        <Chip
          label={company.registrationStatus}
          color={
            company.registrationStatus === 'Active'
              ? 'success'
              : company.registrationStatus === 'Pending'
                ? 'warning'
                : 'default'
          }
          sx={{ ml: 'auto' }}
        />
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Company Information
              </Typography>
              <Stack spacing={2}>
                {[
                  { label: 'Legal Name', value: company.name },
                  { label: 'Trade Name', value: company.tradeName },
                  { label: 'CNPJ', value: company.cnpj },
                  { label: 'Company Size', value: company.companySize },
                  { label: 'Opening Date', value: company.openingDate },
                  { label: 'Registration Status', value: company.registrationStatus },
                ].map((item) => (
                  <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right' }}>{item.value}</Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Contact Information
              </Typography>
              <Stack spacing={2}>
                {[
                  { label: 'Email', value: company.email },
                  { label: 'Phone', value: company.phone },
                  { label: 'Address', value: company.address },
                ].map((item) => (
                  <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{item.value}</Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
