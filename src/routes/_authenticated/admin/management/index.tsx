import { createFileRoute, useNavigate } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'

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

interface CompanyResponse {
  data: Company[]
  total: number
  page: number
  limit: number
  totalPages: number
}

const mockCompanies: CompanyResponse = {
  data: [
    { id: 1, name: 'Acme Technology LLC', cnpj: '12.345.678/0001-95', tradeName: 'Acme Tech', openingDate: '2020-01-15', companySize: 'LLC', registrationStatus: 'Active', address: '123 Main Street, Suite 100, São Paulo, SP', phone: '+55 11 99999-1234', email: 'contact@acmetech.com.br' },
    { id: 2, name: 'Globex Corporation', cnpj: '98.765.432/0001-10', tradeName: 'Globex', openingDate: '2018-06-22', companySize: 'Corporation', registrationStatus: 'Active', address: '456 Oak Avenue, Rio de Janeiro, RJ', phone: '+55 21 98888-5678', email: 'info@globexcorp.com.br' },
    { id: 3, name: 'Initech Solutions Ltda', cnpj: '45.678.901/0001-23', tradeName: 'Initech', openingDate: '2022-03-01', companySize: 'Ltda', registrationStatus: 'Pending', address: '789 Pine Road, Belo Horizonte, MG', phone: '+55 31 97777-9012', email: 'contact@initech.com.br' },
    { id: 4, name: 'Umbrella Holdings S.A.', cnpj: '11.222.333/0001-44', tradeName: 'Umbrella', openingDate: '2015-11-30', companySize: 'SA', registrationStatus: 'Active', address: '321 Cedar Lane, Curitiba, PR', phone: '+55 41 96666-3456', email: 'admin@umbrella.com.br' },
    { id: 5, name: 'Stark Industries Brasil', cnpj: '55.666.777/0001-88', tradeName: 'Stark BR', openingDate: '2023-07-10', companySize: 'LLC', registrationStatus: 'Inactive', address: '654 Maple Drive, Porto Alegre, RS', phone: '+55 51 95555-7890', email: 'contact@starkbr.com.br' },
  ],
  total: 5,
  page: 0,
  limit: 10,
  totalPages: 1,
}

export const Route = createFileRoute('/_authenticated/admin/management/')({
  component: ManagementPage,
})

function ManagementPage() {
  const navigate = useNavigate()
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        Admin
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        System administration and control panel.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                System Status
              </Typography>
              <Stack spacing={2}>
                {[
                  { label: 'Server', value: 'Online', color: 'success' as const },
                  { label: 'Database', value: 'Connected', color: 'success' as const },
                  { label: 'Cache', value: 'Healthy', color: 'success' as const },
                  { label: 'Queue', value: 'Processing', color: 'warning' as const },
                ].map((item) => (
                  <Box
                    key={item.label}
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Typography variant="body2">{item.label}</Typography>
                    <Chip label={item.value} size="small" color={item.color} />
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
                Version Info
              </Typography>
              <Stack spacing={1.5}>
                {[
                  { label: 'App version', value: 'v2.4.1' },
                  { label: 'Last deployed', value: '2026-07-25' },
                  { label: 'Environment', value: 'Production' },
                  { label: 'Uptime', value: '14d 6h 32m' },
                ].map((item) => (
                  <Box
                    key={item.label}
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {item.label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                {[
                  { label: 'Clear Cache', desc: 'Purge all cached data' },
                  { label: 'Run Backup', desc: 'Create a full system backup' },
                  { label: 'Restart Queue', desc: 'Restart the job queue worker' },
                  { label: 'System Logs', desc: 'View recent system logs' },
                ].map((action) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={action.label}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        border: 1,
                        borderColor: 'divider',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s',
                        '&:hover': { bgcolor: 'action.hover' },
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {action.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {action.desc}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Companies
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>CNPJ</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Trade Name</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Size</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockCompanies.data.map((company) => (
                      <TableRow
                        key={company.id}
                        hover
                        sx={{ cursor: 'pointer' }}
                        onClick={() => navigate({ to: '/admin/management/companies/$companyId', params: { companyId: String(company.id) } })}
                      >
                        <TableCell>{company.id}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{company.name}</TableCell>
                        <TableCell>{company.cnpj}</TableCell>
                        <TableCell>{company.tradeName}</TableCell>
                        <TableCell>
                          <Chip
                            label={company.registrationStatus}
                            size="small"
                            color={
                              company.registrationStatus === 'Active'
                                ? 'success'
                                : company.registrationStatus === 'Pending'
                                  ? 'warning'
                                  : 'default'
                            }
                          />
                        </TableCell>
                        <TableCell>{company.companySize}</TableCell>
                        <TableCell>{company.email}</TableCell>
                        <TableCell>{company.phone}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={mockCompanies.total}
                page={mockCompanies.page}
                rowsPerPage={mockCompanies.limit}
                rowsPerPageOptions={[5, 10, 25]}
                onPageChange={() => {}}
                onRowsPerPageChange={() => {}}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
