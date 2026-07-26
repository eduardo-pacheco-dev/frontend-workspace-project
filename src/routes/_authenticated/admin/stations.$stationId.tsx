import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

interface Station {
  id: number
  customerSiteId: string
  siteReferenceId: string
  name: string
  hideSiteLocation: string
  latitude: string
  longitude: string
  geofenceDistance: string
  geofenceStatus: string
  siteCategory: string
  country: string
  customer: string
  status: string
  timezone: string
  clusterId: string
  clusterName: string
  siteAddress: string
  zipCode: string
  district: string
  region: string
  city: string
  virtualSite: string
  useForOnDuty: string
  priorityMode: string
  siteProfile: string
  contactId: string
  firstName: string
  lastName: string
  fax: string
  email: string
  phone: string
  postalCode: string
  role: string
  remark: string
  site: string
  siteAccessAntennas: string
  siteAccessKeysAfterHours: string
  siteAccessSiteAfterHours: string
  siteAccessKeysOfficeHours: string
  siteAccessSiteOfficeHours: string
  siteDirectionToSite: string
  siteEquipmentLocation: string
  siteSpecialVehicle: string
  ocOrdemComplexa: string
  healthSafetyRiskDetails: string[]
  healthSafetyOtherDetail: string
  siteType: string
  structureType: string
  structureProfile: string
  otherCwDetails: string
  towerOrPoleHeight: string
  equipmentHousing: string
  num2g: string
  num3g: string
  num4g: string
  num5g: string
  healthSafetyRisks: string
  regional: string
  uf: string
  ziPartnerCode: string
  name1: string
  name2: string
  searchTerm: string
  street: string
  cityP20: string
  postalCodeP20: string
  countryP20: string
  created: string
}

const station: Station = {
  id: 1,
  customerSiteId: 'SN-ARNTA7',
  siteReferenceId: 'BR-A-1371889',
  name: 'SN-ARNTA7',
  hideSiteLocation: 'No',
  latitude: '-7.270306',
  longitude: '-48.26225',
  geofenceDistance: '300',
  geofenceStatus: 'Disable',
  siteCategory: 'Nominal',
  country: 'Brazil',
  customer: 'TIM Celular S.A.',
  status: 'Active',
  timezone: 'America/Araguaina',
  clusterId: '-',
  clusterName: '-',
  siteAddress: 'Av.RioBandeira,254-Daiara,Araguaina-TO,7...',
  zipCode: '-',
  district: '-',
  region: '-',
  city: '-',
  virtualSite: 'No',
  useForOnDuty: 'No',
  priorityMode: '-',
  siteProfile: '-',
  contactId: '-',
  firstName: '-',
  lastName: '-',
  fax: '-',
  email: '-',
  phone: '-',
  postalCode: '-',
  role: '-',
  remark: '-',
  site: '-',
  siteAccessAntennas: '-',
  siteAccessKeysAfterHours: '-',
  siteAccessSiteAfterHours: '-',
  siteAccessKeysOfficeHours: '-',
  siteAccessSiteOfficeHours: '-',
  siteDirectionToSite: '-',
  siteEquipmentLocation: '-',
  siteSpecialVehicle: '-',
  ocOrdemComplexa: '1347323',
  healthSafetyRiskDetails: [],
  healthSafetyOtherDetail: 'Please update if Health and Safety Risk Detail "Other" is selected',
  siteType: 'Unknown yet – TBD',
  structureType: 'Unknown yet – TBD',
  structureProfile: 'Unknown yet – TBD',
  otherCwDetails: 'Type here ...',
  towerOrPoleHeight: 'Unknown yet – TBD',
  equipmentHousing: 'Unknown yet – TBD',
  num2g: 'Unknown yet – TBD',
  num3g: 'Unknown yet – TBD',
  num4g: 'Unknown yet – TBD',
  num5g: 'Unknown yet – TBD',
  healthSafetyRisks: 'Unknown yet – TBD',
  regional: 'TCO',
  uf: 'TO',
  ziPartnerCode: '0104040424',
  name1: 'SN-ARNTA7',
  name2: '-',
  searchTerm: 'TIM_SN-ARN',
  street: 'Rua Barão do Rio Branco S/N',
  cityP20: 'Capanema',
  postalCodeP20: '68700-105',
  countryP20: 'BR',
  created: '04-04-2026',
}

export const Route = createFileRoute('/_authenticated/admin/stations/$stationId')({
  component: StationDetailPage,
})

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.75, borderBottom: 1, borderColor: 'divider' }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 500, textAlign: 'right', maxWidth: '55%' }}>{value}</Typography>
    </Box>
  )
}

interface FolderItem {
  id: string
  name: string
  children?: TreeNode[]
}

interface DocItem {
  id: string
  name: string
  type: string
  date: string
  status: string
}

type TreeNode = FolderItem | DocItem

let nextId = 100

function newId() {
  return `n${++nextId}`
}

function isFolder(node: TreeNode): node is FolderItem {
  return 'children' in node
}

function cloneTree(node: TreeNode): TreeNode {
  if (isFolder(node)) {
    return { ...node, children: node.children?.map(cloneTree) }
  }
  return { ...node }
}

function findParent(tree: TreeNode, targetId: string): FolderItem | null {
  if (!isFolder(tree)) return null
  if (tree.children?.some((c) => c.id === targetId)) return tree
  for (const child of tree.children ?? []) {
    const found = findParent(child, targetId)
    if (found) return found
  }
  return null
}

function removeFromTree(tree: TreeNode, targetId: string): boolean {
  const parent = findParent(tree, targetId)
  if (parent && parent.children) {
    parent.children = parent.children.filter((c) => c.id !== targetId)
    return true
  }
  return false
}

const initialTree: FolderItem = {
  id: 'root',
  name: 'Documents',
  children: [
    {
      id: 'f1', name: 'Reports',
      children: [
        { id: 'f1a', name: '2026', children: [
          { id: 'd1a1', name: 'Q1 Report.pdf', type: 'PDF', date: '2026-04-04', status: 'Approved' },
          { id: 'd1a2', name: 'Q2 Forecast.pdf', type: 'PDF', date: '2026-03-28', status: 'Pending' },
          { id: 'f1a1a', name: 'Monthly', children: [
            { id: 'd1a1a1', name: 'January.pdf', type: 'PDF', date: '2026-02-01', status: 'Approved' },
            { id: 'd1a1a2', name: 'February.pdf', type: 'PDF', date: '2026-03-01', status: 'Approved' },
          ]},
        ]},
        { id: 'd1b', name: 'Safety Compliance.pdf', type: 'PDF', date: '2026-03-28', status: 'Rejected' },
      ],
    },
    {
      id: 'f2', name: 'Photos',
      children: [
        { id: 'f2a', name: 'Site Visit', children: [
          { id: 'd2a1', name: 'Installation Photos.zip', type: 'ZIP', date: '2026-04-03', status: 'Pending' },
          { id: 'd2a2', name: 'Drone Images.zip', type: 'ZIP', date: '2026-04-01', status: 'Approved' },
        ]},
        { id: 'f2b', name: 'Equipment', children: [
          { id: 'd2b1', name: 'Antenna Setup.jpg', type: 'JPG', date: '2026-03-20', status: 'Approved' },
          { id: 'd2b2', name: 'Cabinet Wiring.jpg', type: 'JPG', date: '2026-03-18', status: 'Approved' },
        ]},
      ],
    },
    {
      id: 'f3', name: 'Spreadsheets',
      children: [
        { id: 'd3a', name: 'Equipment List.xlsx', type: 'XLSX', date: '2026-04-02', status: 'Approved' },
        { id: 'd3b', name: 'Budget Forecast.xlsx', type: 'XLSX', date: '2026-03-20', status: 'Approved' },
      ],
    },
    { id: 'd4', name: 'Site Access Form.docx', type: 'DOCX', date: '2026-03-25', status: 'Approved' },
    { id: 'd5', name: 'Network Diagram.pdf', type: 'PDF', date: '2026-03-15', status: 'Pending' },
  ],
}

function TreeNodeRow({
  node,
  depth = 0,
  onAdd,
  onRename,
  onDelete,
}: {
  node: TreeNode
  depth?: number
  onAdd: (parentId: string, item: TreeNode) => void
  onRename: (id: string, name: string) => void
  onDelete: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(true)
  const [menuEl, setMenuEl] = useState<HTMLElement | null>(null)
  const [renameOpen, setRenameOpen] = useState(false)
  const [renameValue, setRenameValue] = useState('')
  const [deleteOpen, setDeleteOpen] = useState(false)
  const folder = isFolder(node)
  const indent = depth * 4

  function handleAction(e: React.MouseEvent, action: string) {
    e.stopPropagation()
    setMenuEl(null)
    if (action === 'add-folder') {
      const name = prompt('Folder name:')
      if (name) onAdd(node.id, { id: newId(), name, children: [] })
    } else if (action === 'add-file') {
      const name = prompt('File name (with extension):')
      if (name) {
        const ext = name.split('.').pop()?.toUpperCase() ?? 'FILE'
        onAdd(node.id, { id: newId(), name, type: ext, date: new Date().toISOString().slice(0, 10), status: 'Pending' })
      }
    } else if (action === 'rename') {
      setRenameValue(node.name)
      setRenameOpen(true)
    } else if (action === 'delete') {
      setDeleteOpen(true)
    }
  }

  function rowIcon() {
    if (folder) {
      return (
        <Box component="span" sx={{ color: 'warning.main', flexShrink: 0, display: 'flex' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        </Box>
      )
    }
    return (
      <Box component="span" sx={{ color: 'text.disabled', flexShrink: 0, display: 'flex' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </Box>
    )
  }

  return (
    <>
      <TableRow
        hover
        sx={{ cursor: folder ? 'pointer' : 'default', '&:hover': { bgcolor: 'action.hover' } }}
        onClick={() => folder && setExpanded(!expanded)}
      >
        <TableCell sx={{ pl: 3 + indent }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {folder && (
              <Box
                component="span"
                sx={{
                  flexShrink: 0,
                  display: 'flex',
                  transition: 'transform 0.15s',
                  transform: expanded ? 'rotate(90deg)' : 'none',
                  color: 'text.disabled',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Box>
            )}
            {!folder && <Box sx={{ width: 16 }} />}
            {rowIcon()}
            <Typography variant="body2" sx={{ fontWeight: folder ? 600 : 500 }}>{node.name}</Typography>
          </Box>
        </TableCell>
        <TableCell>
          {folder ? (
            <Chip label="Folder" size="small" variant="outlined" />
          ) : (
            <Chip label={node.type} size="small" variant="outlined" />
          )}
        </TableCell>
        <TableCell>
          {folder ? (
            <Typography variant="body2" color="text.disabled">—</Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">{node.date}</Typography>
          )}
        </TableCell>
        <TableCell>
          {folder ? (
            <Typography variant="body2" color="text.disabled">—</Typography>
          ) : (
            <Chip label={node.status} size="small" color={node.status === 'Approved' ? 'success' : node.status === 'Rejected' ? 'error' : 'warning'} />
          )}
        </TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Button
              size="small"
              variant="text"
              sx={{ borderRadius: 999, minWidth: 0, px: 1 }}
              onClick={(e) => {
                e.stopPropagation()
                handleAction(e, 'rename')
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </Button>
            <Button
              size="small"
              variant="text"
              color="error"
              sx={{ borderRadius: 999, minWidth: 0, px: 1 }}
              onClick={(e) => {
                e.stopPropagation()
                handleAction(e, 'delete')
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </Button>
            {folder && (
              <Button
                size="small"
                variant="text"
                sx={{ borderRadius: 999, minWidth: 0, px: 1 }}
                onClick={(e) => {
                  e.stopPropagation()
                  setMenuEl(e.currentTarget)
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </Button>
            )}
          </Box>
          <Menu
            anchorEl={menuEl}
            open={Boolean(menuEl)}
            onClose={() => setMenuEl(null)}
            slotProps={{ paper: { sx: { borderRadius: 2, minWidth: 160 } } }}
          >
            <MenuItem dense onClick={(e) => handleAction(e, 'add-folder')}>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  <line x1="12" y1="11" x2="12" y2="17" />
                  <line x1="9" y1="14" x2="15" y2="14" />
                </svg>
              </ListItemIcon>
              New Folder
            </MenuItem>
            <MenuItem dense onClick={(e) => handleAction(e, 'add-file')}>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="11" x2="12" y2="17" />
                  <line x1="9" y1="14" x2="15" y2="14" />
                </svg>
              </ListItemIcon>
              New File
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
      {folder && expanded && node.children?.map((child) => (
        <TreeNodeRow key={child.id} node={child} depth={depth + 1} onAdd={onAdd} onRename={onRename} onDelete={onDelete} />
      ))}

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 3 } } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Delete {folder ? 'Folder' : 'File'}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to delete <strong>{node.name}</strong>?{folder ? ' All contents inside will also be deleted.' : ''}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDeleteOpen(false)} sx={{ borderRadius: 999 }}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            sx={{ borderRadius: 999 }}
            onClick={() => {
              onDelete(node.id)
              setDeleteOpen(false)
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={renameOpen}
        onClose={() => setRenameOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 3 } } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Rename</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            size="small"
            label="Name"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            sx={{ mt: 1 }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && renameValue.trim()) {
                onRename(node.id, renameValue.trim())
                setRenameOpen(false)
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setRenameOpen(false)} sx={{ borderRadius: 999 }}>Cancel</Button>
          <Button
            variant="contained"
            sx={{ borderRadius: 999 }}
            disabled={!renameValue.trim()}
            onClick={() => {
              onRename(node.id, renameValue.trim())
              setRenameOpen(false)
            }}
          >
            Rename
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

function DocumentsSection() {
  const [tree, setTree] = useState(() => cloneTree(initialTree))

  function handleAdd(parentId: string, item: TreeNode) {
    setTree((prev) => {
      const t = cloneTree(prev) as FolderItem
      const parent = findParent(t, parentId) ?? t
      parent.children = [...(parent.children ?? []), item]
      return t
    })
  }

  function handleRename(id: string, name: string) {
    setTree((prev) => {
      const t = cloneTree(prev)
      const parent = findParent(t, id)
      if (parent) {
        const node = parent.children?.find((c) => c.id === id)
        if (node) node.name = name
      }
      return t
    })
  }

  function handleDelete(id: string) {
    setTree((prev) => {
      const t = cloneTree(prev) as FolderItem
      removeFromTree(t, id)
      return t
    })
  }

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Documents
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" size="small" sx={{ borderRadius: 999 }} onClick={() => {
              const name = prompt('Folder name:')
              if (name) handleAdd((tree as FolderItem).id, { id: newId(), name, children: [] })
            }}>
              New Folder
            </Button>
            <Button variant="contained" size="small" sx={{ borderRadius: 999 }} onClick={() => {
              const name = prompt('File name (with extension):')
              if (name) {
                const ext = name.split('.').pop()?.toUpperCase() ?? 'FILE'
                handleAdd((tree as FolderItem).id, { id: newId(), name, type: ext, date: new Date().toISOString().slice(0, 10), status: 'Pending' })
              }
            }}>
              Upload
            </Button>
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(tree as FolderItem).children?.map((child: TreeNode) => (
                <TreeNodeRow key={child.id} node={child} onAdd={handleAdd} onRename={handleRename} onDelete={handleDelete} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

function StationDetailPage() {
  const [data, setData] = useState(station)
  const [editOpen, setEditOpen] = useState(false)
  const [form, setForm] = useState<Station | null>(null)
  const [snack, setSnack] = useState({ open: false, message: '' })
  const [tab, setTab] = useState(0)
  const s = data

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 1 }}>
        <Button component={Link} to="/admin/stations" variant="text" sx={{ borderRadius: 999, minWidth: 0, px: 1 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Button>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{s.name}</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap', mt: 0.25 }}>
            <Typography variant="body2" color="text.secondary">{s.customerSiteId}</Typography>
            <Typography variant="body2" color="text.disabled">·</Typography>
            <Typography variant="body2" color="text.secondary">{s.siteReferenceId}</Typography>
            <Typography variant="body2" color="text.disabled">·</Typography>
            <Chip label={s.status} size="small" color={s.status === 'Active' ? 'success' : s.status === 'Pending' ? 'warning' : 'default'} sx={{ height: 20, '& .MuiChip-label': { fontSize: 11, px: 0.75 } }} />
            <Chip label={s.siteType} size="small" variant="outlined" sx={{ height: 20, '& .MuiChip-label': { fontSize: 11, px: 0.75 } }} />
          </Stack>
        </Box>
        <Button variant="contained" size="small" sx={{ borderRadius: 999, flexShrink: 0 }} onClick={() => { setForm({ ...s }); setEditOpen(true) }}>Edit</Button>
      </Stack>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Basic Details" />
        <Tab label="Site Details" />
        <Tab label="Site Custom Fields" />
        <Tab label="Site Address" />
        <Tab label="P20 Site Details" />
        <Tab label="Documents" />
      </Tabs>

      {tab === 0 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>Location</Typography>
                <DetailRow label="Latitude" value={s.latitude} />
                <DetailRow label="Longitude" value={s.longitude} />
                <DetailRow label="Country" value={s.country} />
                <DetailRow label="Timezone" value={s.timezone} />
                <DetailRow label="Site Address" value={s.siteAddress} />
                <DetailRow label="Zip Code" value={s.zipCode} />
                <DetailRow label="District" value={s.district} />
                <DetailRow label="Region" value={s.region} />
                <DetailRow label="City" value={s.city} />
                <DetailRow label="Hide Site Location" value={s.hideSiteLocation} />
                <DetailRow label="Geofence Distance (meters)" value={s.geofenceDistance} />
                <DetailRow label="Geofence Distance Status" value={s.geofenceStatus} />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>General</Typography>
                <DetailRow label="Customer Site ID" value={s.customerSiteId} />
                <DetailRow label="Site Reference ID" value={s.siteReferenceId} />
                <DetailRow label="Name" value={s.name} />
                <DetailRow label="Site Category" value={s.siteCategory} />
                <DetailRow label="Customer" value={s.customer} />
                <DetailRow label="Status" value={s.status} />
                <DetailRow label="Cluster ID" value={s.clusterId} />
                <DetailRow label="Cluster Name" value={s.clusterName} />
                <DetailRow label="Virtual Site" value={s.virtualSite} />
                <DetailRow label="Use For On Duty Ad Hoc Module" value={s.useForOnDuty} />
                <DetailRow label="Priority Mode" value={s.priorityMode} />
                <DetailRow label="Site Profile" value={s.siteProfile} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tab === 1 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>Contact</Typography>
                <DetailRow label="Contact Id" value={s.contactId} />
                <DetailRow label="First Name" value={s.firstName} />
                <DetailRow label="Last Name" value={s.lastName} />
                <DetailRow label="Fax" value={s.fax} />
                <DetailRow label="Email" value={s.email} />
                <DetailRow label="Phone" value={s.phone} />
                <DetailRow label="Postal Code" value={s.postalCode} />
                <DetailRow label="Role" value={s.role} />
                <DetailRow label="Remark" value={s.remark} />
                <DetailRow label="Site" value={s.site} />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>Access</Typography>
                <DetailRow label="Site Access Antennas" value={s.siteAccessAntennas} />
                <DetailRow label="Site Access Keys After Hours" value={s.siteAccessKeysAfterHours} />
                <DetailRow label="Site Access Site After Hours" value={s.siteAccessSiteAfterHours} />
                <DetailRow label="Site Access Keys Office Hours" value={s.siteAccessKeysOfficeHours} />
                <DetailRow label="Site Access Site Office Hours" value={s.siteAccessSiteOfficeHours} />
                <DetailRow label="Site Direction To Site" value={s.siteDirectionToSite} />
                <DetailRow label="Site Equipment Location" value={s.siteEquipmentLocation} />
                <DetailRow label="Site Special Vehicle" value={s.siteSpecialVehicle} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tab === 2 && (
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <DetailRow label="OC Ordem Complexa" value={s.ocOrdemComplexa} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.75, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="body2" color="text.secondary">Health and Safety Risk Details</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, textAlign: 'right', maxWidth: '55%' }}>
                    {s.healthSafetyRiskDetails.length === 0 ? 'None selected' : s.healthSafetyRiskDetails.join(', ')}
                  </Typography>
                </Box>
                <DetailRow label="Health and Safety Other Detail" value={s.healthSafetyOtherDetail} />
                <DetailRow label="Site Type" value={s.siteType} />
                <DetailRow label="Structure Type" value={s.structureType} />
                <DetailRow label="Structure Profile" value={s.structureProfile} />
                <DetailRow label="Other CW Details" value={s.otherCwDetails} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DetailRow label="Tower or Pole Height in meters" value={s.towerOrPoleHeight} />
                <DetailRow label="Equipment Housing" value={s.equipmentHousing} />
                <DetailRow label="Number of 2G cells at site" value={s.num2g} />
                <DetailRow label="Number of 3G cells at site" value={s.num3g} />
                <DetailRow label="Number of 4G cells at site" value={s.num4g} />
                <DetailRow label="Number of 5G cells at site" value={s.num5g} />
                <DetailRow label="Site Health and Safety Risks" value={s.healthSafetyRisks} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {tab === 3 && (
        <Card>
          <CardContent sx={{ p: 3 }}>
            <DetailRow label="Regional" value={s.regional} />
            <DetailRow label="UF" value={s.uf} />
          </CardContent>
        </Card>
      )}

      {tab === 4 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <DetailRow label="ZI Partner Code" value={s.ziPartnerCode} />
                <DetailRow label="Name1" value={s.name1} />
                <DetailRow label="Name2" value={s.name2} />
                <DetailRow label="Search Term" value={s.searchTerm} />
                <DetailRow label="Created" value={s.created} />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <DetailRow label="Street" value={s.street} />
                <DetailRow label="City" value={s.cityP20} />
                <DetailRow label="Postal Code" value={s.postalCodeP20} />
                <DetailRow label="Country" value={s.countryP20} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tab === 5 && (
        <DocumentsSection />
      )}

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="md" fullWidth slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Edit Station</DialogTitle>
        {form && (
          <DialogContent>
            <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Name" fullWidth size="small" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Customer Site ID" fullWidth size="small" value={form.customerSiteId} onChange={(e) => setForm({ ...form, customerSiteId: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Site Reference ID" fullWidth size="small" value={form.siteReferenceId} onChange={(e) => setForm({ ...form, siteReferenceId: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Status" fullWidth size="small" select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  {['Active', 'Inactive', 'Pending'].map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Site Type" fullWidth size="small" value={form.siteType} onChange={(e) => setForm({ ...form, siteType: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Customer" fullWidth size="small" value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Latitude" fullWidth size="small" value={form.latitude} onChange={(e) => setForm({ ...form, latitude: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Longitude" fullWidth size="small" value={form.longitude} onChange={(e) => setForm({ ...form, longitude: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Country" fullWidth size="small" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Timezone" fullWidth size="small" value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField label="Site Address" fullWidth size="small" value={form.siteAddress} onChange={(e) => setForm({ ...form, siteAddress: e.target.value })} />
              </Grid>
            </Grid>
          </DialogContent>
        )}
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setEditOpen(false)} sx={{ borderRadius: 999 }}>Cancel</Button>
          <Button variant="contained" sx={{ borderRadius: 999 }} onClick={() => {
            if (form) {
              setData(form)
              setEditOpen(false)
              setSnack({ open: true, message: 'Station updated successfully.' })
            }
          }}>Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ open: false, message: '' })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>{snack.message}</Alert>
      </Snackbar>
    </Box>
  )
}
