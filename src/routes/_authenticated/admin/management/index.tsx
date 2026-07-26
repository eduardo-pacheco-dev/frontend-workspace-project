import { createFileRoute, useNavigate } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
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
        Companies
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage registered companies.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Company Details
              </Typography>
              {(() => {
                const c = mockCompanies.data[0]
                return (
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>{c.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{c.tradeName} · {c.cnpj}</Typography>
                      </Box>
                      <Chip label={c.registrationStatus} size="small" color={c.registrationStatus === 'Active' ? 'success' : c.registrationStatus === 'Pending' ? 'warning' : 'default'} />
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
                      {[
                        { label: 'Opening Date', value: c.openingDate },
                        { label: 'Company Size', value: c.companySize },
                        { label: 'Email', value: c.email },
                        { label: 'Phone', value: c.phone },
                      ].map((item) => (
                        <Box key={item.label}>
                          <Typography variant="caption" color="text.secondary">{item.label}</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{item.value}</Typography>
                        </Box>
                      ))}
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Address</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{c.address}</Typography>
                    </Box>
                  </Stack>
                )
              })()}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                All Companies
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
