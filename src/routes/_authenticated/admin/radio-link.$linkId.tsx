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
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TextField from '@mui/material/TextField'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'


interface RadioLink {
  id: number
  status: string
  linkName: string
  linkType: string
  frequency: string
  distance: string
  stationAName: string
  stationASiteId: string
  stationBName: string
  stationBSiteId: string
  customer: string
  modifiedBy: string
}

const links: RadioLink[] = [
  { id: 1, status: 'Active', linkName: 'SP-RJ Link', linkType: 'Microwave', frequency: '23 GHz', distance: '12.5 km', stationAName: 'São Paulo Hub', stationASiteId: 'CUST-001', stationBName: 'Rio de Janeiro Branch', stationBSiteId: 'CUST-002', customer: 'Acme Corp', modifiedBy: 'John Doe' },
  { id: 2, status: 'Active', linkName: 'BH-VIX Link', linkType: 'Fiber', frequency: '—', distance: '85.0 km', stationAName: 'Belo Horizonte Depot', stationASiteId: 'CUST-003', stationBName: 'Vitória Station', stationBSiteId: 'CUST-009', customer: 'Initech', modifiedBy: 'Jane Smith' },
  { id: 3, status: 'Pending', linkName: 'CTB-POA Link', linkType: 'Microwave', frequency: '18 GHz', distance: '32.0 km', stationAName: 'Curitiba Center', stationASiteId: 'CUST-004', stationBName: 'Porto Alegre Unit', stationBSiteId: 'CUST-005', customer: 'Umbrella Co', modifiedBy: 'Alice Brown' },
  { id: 4, status: 'Inactive', linkName: 'BSB-DF Link', linkType: 'Satellite', frequency: 'Ku-band', distance: '—', stationAName: 'Brasília HQ', stationASiteId: 'CUST-006', stationBName: 'Fortaleza Outpost', stationBSiteId: 'CUST-007', customer: 'Acme Corp', modifiedBy: 'Charlie Wilson' },
  { id: 5, status: 'Active', linkName: 'REC-SSA Link', linkType: 'Fiber', frequency: '—', distance: '48.3 km', stationAName: 'Recife Branch', stationASiteId: 'CUST-008', stationBName: 'Salvador Station', stationBSiteId: 'CUST-010', customer: 'Globex Inc', modifiedBy: 'John Doe' },
]

export const Route = createFileRoute('/_authenticated/admin/radio-link/$linkId')({
  component: RadioLinkDetailPage,
})

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.75, borderBottom: 1, borderColor: 'divider' }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{value}</Typography>
    </Box>
  )
}

function StationCard({ title, name, siteId }: { title: string; name: string; siteId: string }) {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>{title}</Typography>
          <DetailRow label="Name" value={name} />
          <DetailRow label="Site ID" value={siteId} />
        </CardContent>
      </Card>
    </Grid>
  )
}

interface FolderItem { id: string; name: string; children?: (FolderItem | DocItem)[] }
interface DocItem { id: string; name: string; type: string; date: string; status: string }
type TreeNode = FolderItem | DocItem

let nextId = 1000
function newId() { return `r${++nextId}` }
function isFolder(node: TreeNode): node is FolderItem { return 'children' in node }

function cloneTree(node: TreeNode): TreeNode {
  if (isFolder(node)) return { ...node, children: node.children?.map(cloneTree) }
  return { ...node }
}

function findParent(tree: TreeNode, targetId: string): FolderItem | null {
  if (!isFolder(tree)) return null
  if (tree.children?.some((c) => c.id === targetId)) return tree
  for (const child of tree.children ?? []) { const found = findParent(child, targetId); if (found) return found }
  return null
}

function removeFromTree(tree: TreeNode, targetId: string): boolean {
  const parent = findParent(tree, targetId)
  if (parent && parent.children) { parent.children = parent.children.filter((c) => c.id !== targetId); return true }
  return false
}

const initialDocTree: FolderItem = {
  id: 'root', name: 'Documents', children: [
    { id: 'rf1', name: 'Link Documents', children: [
      { id: 'rd1', name: 'Link Setup Contract.pdf', type: 'PDF', date: '2026-04-01', status: 'Approved' },
      { id: 'rd2', name: 'Frequency License.pdf', type: 'PDF', date: '2026-03-28', status: 'Approved' },
      { id: 'rf1a', name: 'Station A', children: [
        { id: 'rd3', name: 'SP Hub Specs.pdf', type: 'PDF', date: '2026-03-25', status: 'Approved' },
      ]},
      { id: 'rf1b', name: 'Station B', children: [
        { id: 'rd4', name: 'RJ Branch Specs.pdf', type: 'PDF', date: '2026-03-25', status: 'Pending' },
      ]},
    ]},
    { id: 'rf2', name: 'Test Results', children: [
      { id: 'rd5', name: 'Link Test Report.xlsx', type: 'XLSX', date: '2026-04-02', status: 'Approved' },
    ]},
  ],
}

const linkAlbums = [
  { id: 'link-photos', name: 'Link Photos', photos: [
    { id: 1, src: 'https://picsum.photos/seed/link1/400/300', title: 'Link Overview', date: '2026-04-01' },
    { id: 2, src: 'https://picsum.photos/seed/link2/400/300', title: 'Antenna Alignment', date: '2026-04-01' },
  ]},
  { id: 'station-a-photos', name: 'Station A', photos: [
    { id: 3, src: 'https://picsum.photos/seed/link3/400/300', title: 'Station A Equipment', date: '2026-03-28' },
  ]},
  { id: 'station-b-photos', name: 'Station B', photos: [
    { id: 4, src: 'https://picsum.photos/seed/link4/400/300', title: 'Station B Setup', date: '2026-03-28' },
  ]},
]

function DocumentsSection() {
  const [tree, setTree] = useState(() => cloneTree(initialDocTree))
  const [renameOpen, setRenameOpen] = useState(false)
  const [renameValue, setRenameValue] = useState('')
  const [renameTarget, setRenameTarget] = useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  function handleAdd(parentId: string, item: TreeNode) {
    setTree((prev) => { const t = cloneTree(prev) as FolderItem; const parent = findParent(t, parentId) ?? t; parent.children = [...(parent.children ?? []), item]; return t })
  }
  function handleRename(id: string, name: string) {
    setTree((prev) => {
      const t = cloneTree(prev); const parent = findParent(t, id)
      if (parent) { const node = parent.children?.find((c) => c.id === id); if (node) node.name = name }
      return t
    })
  }
  function handleDelete(id: string) {
    setTree((prev) => { const t = cloneTree(prev) as FolderItem; removeFromTree(t, id); return t })
  }

  function TreeNodeRowComponent({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
    const [expanded, setExpanded] = useState(true)
    const [menuEl, setMenuEl] = useState<HTMLElement | null>(null)
    const folder = isFolder(node)
    const indent = depth * 4

    return (
      <>
        <TableRow hover sx={{ cursor: folder ? 'pointer' : 'default', '&:hover': { bgcolor: 'action.hover' } }} onClick={() => folder && setExpanded(!expanded)}>
          <TableCell sx={{ pl: 3 + indent }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {folder && (
                <Box component="span" sx={{ flexShrink: 0, display: 'flex', transition: 'transform 0.15s', transform: expanded ? 'rotate(90deg)' : 'none', color: 'text.disabled' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9 18 15 12 9 6" /></svg>
                </Box>
              )}
              {!folder && <Box sx={{ width: 16 }} />}
              <Box component="span" sx={{ color: folder ? 'warning.main' : 'text.disabled', flexShrink: 0, display: 'flex' }}>
                {folder ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                )}
              </Box>
              <Typography variant="body2" sx={{ fontWeight: folder ? 600 : 500 }}>{node.name}</Typography>
            </Box>
          </TableCell>
          <TableCell>{folder ? <Chip label="Folder" size="small" variant="outlined" /> : <Chip label={node.type} size="small" variant="outlined" />}</TableCell>
          <TableCell>{folder ? <Typography variant="body2" color="text.disabled">—</Typography> : <Typography variant="body2" color="text.secondary">{node.date}</Typography>}</TableCell>
          <TableCell>{folder ? <Typography variant="body2" color="text.disabled">—</Typography> : <Chip label={node.status} size="small" color={node.status === 'Approved' ? 'success' : node.status === 'Rejected' ? 'error' : 'warning'} />}</TableCell>
          <TableCell>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Button size="small" variant="text" sx={{ borderRadius: 999, minWidth: 0, px: 1 }} onClick={(e) => { e.stopPropagation(); setRenameTarget(node.id); setRenameValue(node.name); setRenameOpen(true) }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
              </Button>
              <Button size="small" variant="text" color="error" sx={{ borderRadius: 999, minWidth: 0, px: 1 }} onClick={(e) => { e.stopPropagation(); setDeleteTarget(node.id); setDeleteOpen(true) }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
              </Button>
              {folder && (
                <Button size="small" variant="text" sx={{ borderRadius: 999, minWidth: 0, px: 1 }} onClick={(e) => { e.stopPropagation(); setMenuEl(e.currentTarget) }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                </Button>
              )}
            </Box>
            <Menu anchorEl={menuEl} open={Boolean(menuEl)} onClose={() => setMenuEl(null)} slotProps={{ paper: { sx: { borderRadius: 2, minWidth: 160 } } }}>
              <MenuItem dense onClick={(e) => { e.stopPropagation(); setMenuEl(null); const n = prompt('Folder name:'); if (n) handleAdd(node.id, { id: newId(), name: n, children: [] }) }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /><line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" /></svg>
                </ListItemIcon>
                New Folder
              </MenuItem>
              <MenuItem dense onClick={(e) => { e.stopPropagation(); setMenuEl(null); const n = prompt('File name:'); if (n) { const ext = n.split('.').pop()?.toUpperCase() ?? 'FILE'; handleAdd(node.id, { id: newId(), name: n, type: ext, date: new Date().toISOString().slice(0, 10), status: 'Pending' }) } }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" /></svg>
                </ListItemIcon>
                New File
              </MenuItem>
            </Menu>
          </TableCell>
        </TableRow>
        {folder && expanded && node.children?.map((child: TreeNode) => <TreeNodeRowComponent key={child.id} node={child} depth={depth + 1} />)}
      </>
    )
  }

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Documents</Typography>
          <Button size="small" variant="outlined" sx={{ borderRadius: 999 }} onClick={() => { const n = prompt('Folder name:'); if (n) handleAdd((tree as FolderItem).id, { id: newId(), name: n, children: [] }) }}>New Folder</Button>
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
              {(tree as FolderItem).children?.map((child) => <TreeNodeRowComponent key={child.id} node={child} />)}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <Dialog open={renameOpen} onClose={() => setRenameOpen(false)} maxWidth="xs" fullWidth slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Rename</DialogTitle>
        <DialogContent><TextField autoFocus fullWidth size="small" label="Name" value={renameValue} onChange={(e) => setRenameValue(e.target.value)} sx={{ mt: 1 }} /></DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setRenameOpen(false)} sx={{ borderRadius: 999 }}>Cancel</Button>
          <Button variant="contained" sx={{ borderRadius: 999 }} onClick={() => { if (renameTarget && renameValue.trim()) { handleRename(renameTarget, renameValue.trim()); setRenameOpen(false) } }}>Rename</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} maxWidth="xs" fullWidth slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Delete</DialogTitle>
        <DialogContent><Typography variant="body2" color="text.secondary">Are you sure you want to delete this item?</Typography></DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDeleteOpen(false)} sx={{ borderRadius: 999 }}>Cancel</Button>
          <Button variant="contained" color="error" sx={{ borderRadius: 999 }} onClick={() => { if (deleteTarget) { handleDelete(deleteTarget); setDeleteOpen(false) } }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

function PhotosSection() {
  const [preview, setPreview] = useState<{ src: string; title: string } | null>(null)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Photos</Typography>
        {linkAlbums.map((album) => {
          const isOpen = expanded[album.id] ?? true
          return (
            <Box key={album.id} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, cursor: 'pointer' }} onClick={() => setExpanded((p) => ({ ...p, [album.id]: !isOpen }))}>
                <Box component="span" sx={{ display: 'flex', transition: 'transform 0.15s', transform: isOpen ? 'rotate(90deg)' : 'none', color: 'text.disabled' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9 18 15 12 9 6" /></svg>
                </Box>
                <Box component="span" sx={{ color: 'warning.main', display: 'flex' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{album.name}</Typography>
                <Typography variant="caption" color="text.disabled">({album.photos.length})</Typography>
              </Box>
              {isOpen && (
                <ImageList cols={4} gap={12} sx={{ m: 0 }}>
                  {album.photos.map((photo) => (
                    <ImageListItem key={photo.id} sx={{ cursor: 'pointer', borderRadius: 2, overflow: 'hidden' }} onClick={() => setPreview(photo)}>
                      <img src={photo.src} alt={photo.title} loading="lazy" style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
                      <Box sx={{ p: 0.75 }}><Typography variant="caption" sx={{ fontWeight: 600 }}>{photo.title}</Typography></Box>
                    </ImageListItem>
                  ))}
                </ImageList>
              )}
            </Box>
          )
        })}
      </CardContent>
      <Dialog open={Boolean(preview)} onClose={() => setPreview(null)} maxWidth="md" slotProps={{ paper: { sx: { borderRadius: 3, overflow: 'hidden' } } }}>
        {preview && <Box sx={{ lineHeight: 0 }}><img src={preview.src} alt={preview.title} style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', background: '#000', display: 'block' }} /></Box>}
      </Dialog>
    </Card>
  )
}

function CommentsSection() {
  const [comments, setComments] = useState([
    { id: 1, author: 'John Doe', text: 'Link installation completed successfully.', date: '2026-04-04', role: 'Engineer' },
    { id: 2, author: 'Jane Smith', text: 'Frequency license approved for 23 GHz.', date: '2026-04-02', role: 'Manager' },
  ])
  const [newComment, setNewComment] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!newComment.trim()) return
    const nextCommentId = Math.max(...comments.map((c) => c.id), 0) + 1
    setComments([...comments, { id: nextCommentId, author: 'Current User', text: newComment.trim(), date: new Date().toISOString().slice(0, 10), role: 'Admin' }])
    setNewComment('')
  }

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Comments ({comments.length})</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <TextField placeholder="Add a comment..." size="small" fullWidth value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          <Button type="submit" variant="contained" sx={{ borderRadius: 999 }} disabled={!newComment.trim()}>Send</Button>
        </Box>
        <Stack spacing={2}>
          {comments.map((c) => (
            <Box key={c.id} sx={{ p: 2, borderRadius: 2, border: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{c.author}</Typography>
                  <Chip label={c.role} size="small" variant="outlined" sx={{ height: 20, '& .MuiChip-label': { fontSize: 11, px: 0.75 } }} />
                </Box>
                <Typography variant="caption" color="text.disabled">{c.date}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">{c.text}</Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

function RadioLinkDetailPage() {
  const { linkId } = Route.useParams()
  const id = Number(linkId)
  const link = links.find((l) => l.id === id)
  const [tab, setTab] = useState(0)

  if (!link) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Radio Link not found</Typography>
        <Button component={Link} to="/admin/radio-link" variant="outlined" sx={{ borderRadius: 999 }}>Back to Radio Links</Button>
      </Box>
    )
  }

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3 }}>
        <Button component={Link} to="/admin/radio-link" variant="text" sx={{ borderRadius: 999, minWidth: 0, px: 1 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        </Button>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{link.linkName}</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap', mt: 0.25 }}>
            <Chip label={link.status} size="small" color={link.status === 'Active' ? 'success' : link.status === 'Pending' ? 'warning' : 'default'} sx={{ height: 20, '& .MuiChip-label': { fontSize: 11, px: 0.75 } }} />
            <Chip label={link.linkType} size="small" variant="outlined" sx={{ height: 20, '& .MuiChip-label': { fontSize: 11, px: 0.75 } }} />
            <Typography variant="body2" color="text.secondary">{link.frequency}</Typography>
            <Typography variant="body2" color="text.disabled">·</Typography>
            <Typography variant="body2" color="text.secondary">{link.distance}</Typography>
          </Stack>
        </Box>
      </Stack>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Basic Details" />
        <Tab label="Documents" />
        <Tab label="Photos" />
        <Tab label="Comments" />
      </Tabs>

      {tab === 0 && (
        <Grid container spacing={3}>
          <StationCard title="Station A" name={link.stationAName} siteId={link.stationASiteId} />
          <StationCard title="Station B" name={link.stationBName} siteId={link.stationBSiteId} />
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>Link Details</Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <DetailRow label="Link Name" value={link.linkName} />
                    <DetailRow label="Link Type" value={link.linkType} />
                    <DetailRow label="Frequency" value={link.frequency} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <DetailRow label="Distance" value={link.distance} />
                    <DetailRow label="Customer" value={link.customer} />
                    <DetailRow label="Modified By" value={link.modifiedBy} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tab === 1 && <DocumentsSection />}
      {tab === 2 && <PhotosSection />}
      {tab === 3 && <CommentsSection />}
    </Box>
  )
}
