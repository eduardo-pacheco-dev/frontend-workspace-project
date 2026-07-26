import { createFileRoute } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'

interface Station {
  id: number
  status: string
  siteName: string
  siteType: string
  customerSiteId: string
  siteReferenceId: string
  customer: string
  modifiedBy: string
  ziPartner: string
}

const stations: Station[] = [
  { id: 1, status: 'Active', siteName: 'São Paulo Hub', siteType: 'Warehouse', customerSiteId: 'CUST-001', siteReferenceId: 'REF-1001', customer: 'Acme Corp', modifiedBy: 'John Doe', ziPartner: 'ZIP-001' },
  { id: 2, status: 'Active', siteName: 'Rio de Janeiro Branch', siteType: 'Office', customerSiteId: 'CUST-002', siteReferenceId: 'REF-1002', customer: 'Globex Inc', modifiedBy: 'Jane Smith', ziPartner: 'ZIP-002' },
  { id: 3, status: 'Inactive', siteName: 'Belo Horizonte Depot', siteType: 'Depot', customerSiteId: 'CUST-003', siteReferenceId: 'REF-1003', customer: 'Initech', modifiedBy: 'Bob Johnson', ziPartner: 'ZIP-003' },
  { id: 4, status: 'Active', siteName: 'Curitiba Center', siteType: 'Data Center', customerSiteId: 'CUST-004', siteReferenceId: 'REF-1004', customer: 'Umbrella Co', modifiedBy: 'Alice Brown', ziPartner: 'ZIP-004' },
  { id: 5, status: 'Pending', siteName: 'Porto Alegre Unit', siteType: 'Office', customerSiteId: 'CUST-005', siteReferenceId: 'REF-1005', customer: 'Stark Ind', modifiedBy: 'Charlie Wilson', ziPartner: 'ZIP-005' },
  { id: 6, status: 'Active', siteName: 'Brasília HQ', siteType: 'Headquarters', customerSiteId: 'CUST-006', siteReferenceId: 'REF-1006', customer: 'Acme Corp', modifiedBy: 'John Doe', ziPartner: 'ZIP-001' },
  { id: 7, status: 'Inactive', siteName: 'Fortaleza Outpost', siteType: 'Warehouse', customerSiteId: 'CUST-007', siteReferenceId: 'REF-1007', customer: 'Globex Inc', modifiedBy: 'Jane Smith', ziPartner: 'ZIP-002' },
  { id: 8, status: 'Active', siteName: 'Recife Branch', siteType: 'Office', customerSiteId: 'CUST-008', siteReferenceId: 'REF-1008', customer: 'Initech', modifiedBy: 'Bob Johnson', ziPartner: 'ZIP-003' },
]

export const Route = createFileRoute('/_authenticated/admin/stations')({
  component: StationsPage,
})

function StationsPage() {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        Stations
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage all registered stations and sites.
      </Typography>

      <Card>
        <CardContent sx={{ p: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Site Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Site Type</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Customer Site ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Site Reference ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Modified By</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>ZI Partner</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stations.map((station) => (
                  <TableRow key={station.id} hover>
                    <TableCell>
                      <Chip
                        label={station.status}
                        size="small"
                        color={
                          station.status === 'Active'
                            ? 'success'
                            : station.status === 'Pending'
                              ? 'warning'
                              : 'default'
                        }
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{station.siteName}</TableCell>
                    <TableCell>{station.siteType}</TableCell>
                    <TableCell>{station.customerSiteId}</TableCell>
                    <TableCell>{station.siteReferenceId}</TableCell>
                    <TableCell>{station.customer}</TableCell>
                    <TableCell>{station.modifiedBy}</TableCell>
                    <TableCell>{station.ziPartner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={stations.length}
            page={0}
            rowsPerPage={10}
            rowsPerPageOptions={[5, 10, 25]}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
          />
        </CardContent>
      </Card>
    </Box>
  )
}
