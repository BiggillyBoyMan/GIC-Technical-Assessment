import { useState, useEffect, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
import { Avatar, Button, Space, Pagination, Tooltip, theme } from 'antd'
import { EditOutlined, DeleteOutlined, ShopOutlined, EyeOutlined } from '@ant-design/icons'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useNavigate } from 'react-router-dom'
import ViewModal from './ViewModal'

ModuleRegistry.registerModules([AllCommunityModule])

const ROW_HEIGHT = 48
const HEADER_HEIGHT = 56
const PAGINATION_HEIGHT = 56
// Everything above the table: page title + button row + dropdown + margin
const CHROME_HEIGHT = 220

function LogoCell({ value, data }) {
  return value
    ? <Avatar src={value} size={32} shape="square" style={{ borderRadius: 4 }} />
    : <Avatar icon={<ShopOutlined />} size={32} shape="square" style={{ background: '#c8956c', borderRadius: 4 }}>{data?.name?.[0]?.toUpperCase()}</Avatar>
}

function ActionButtons({ data, onEdit, onDelete, onView }) {
  return (
    <Space size={4} style={{ height: '100%', alignItems: 'center', display: 'flex' }}>
      <Tooltip title="View">
        <Button
          type="text"
          size="small"
          icon={<EyeOutlined/>}
          onClick={(e) => {e.stopPropagation(); onView(data)}}
        />
      </Tooltip>

      <Tooltip title="Edit">
        <Button
          type="text"
          size="small"
          icon={<EditOutlined style={{ color: '#4096ff' }} />}
          onClick={(e) => { e.stopPropagation(); onEdit(data) }}
        />
      </Tooltip>

      <Tooltip title="Delete">
        <Button
          type="text"
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={(e) => { e.stopPropagation(); onDelete(data.id) }}
        />
      </Tooltip>
    </Space>
  )
}
const cafeFields = [
    { label: 'Logo',        key: 'logo', render: (value, data) => 
      value 
          ? <Avatar src={value} size={64} shape="square" />
          : <Avatar icon={<ShopOutlined />} size={64} shape="square" style={{ background: '#c8956c' }} />
    },
    { label: 'Name',        key: 'name' },
    { label: 'Description', key: 'description' },
    { label: 'Location',    key: 'location' },
    { label: 'Employees',   key: 'employees' },
    { label: 'ID',          key: 'id' },
]

function CafesTable({ cafes, onEdit, onDelete, onView }) {
  const { token } = theme.useToken()
  const containerRef = useRef(null)
  const [pageSize, setPageSize] = useState(8)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewData, setViewData] = useState(null)
  const navigate = useNavigate()

  // Recalculate pageSize whenever the window resizes
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const availableHeight = window.innerHeight - CHROME_HEIGHT - HEADER_HEIGHT - PAGINATION_HEIGHT
      const rows = Math.max(3, Math.floor(availableHeight / ROW_HEIGHT))
      setPageSize(rows)
      setCurrentPage(1) // reset to page 1 when layout changes
    })

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const columnDefs = [
    {
      headerName: 'Logo',
      width: 72,
      cellRenderer: (params) => <LogoCell value={params.data?.logo} data={params.data} />,
    },
    { field: 'name',        headerName: 'Name',        flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    { field: 'employees',   headerName: 'Employees',   flex: 1,
        cellRenderer: (params) => (
            <span
                onClick={() => navigate(`/employees?cafe=${params.data.id}`)}
                style={{
                    color: '#4096FF',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                }}
            >
            {params.value}
            </span>
        )
    },
    { field: 'location',    headerName: 'Location',    flex: 1 },
    {
      headerName: 'Actions',
      width: 100,
      cellRenderer: (params) => (
        <ActionButtons data={params.data} onEdit={onEdit} onDelete={onDelete} onView={(data) => setViewData(data)} />
      )
    }
  ]

  const paginatedCafes = cafes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const gridHeight = pageSize * ROW_HEIGHT + HEADER_HEIGHT

  return (
    <div ref={containerRef} style={{ marginTop: 24 }}>
      <div
        className="ag-theme-alpine"
        style={{
          height: gridHeight,
          borderRadius: `${token.borderRadius}px ${token.borderRadius}px 0 0`,
          overflow: 'hidden',
          border: `1px solid ${token.colorBorder}`,
          borderBottom: 'none',
        }}
      >
        <AgGridReact
          rowData={paginatedCafes}
          columnDefs={columnDefs}
          defaultColDef={{
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
            suppressMovable: true
          }}
          pagination={false}
          headerHeight={HEADER_HEIGHT}
          rowHeight={ROW_HEIGHT}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          background: token.colorBgContainer,
          border: `1px solid ${token.colorBorder}`,
          borderRadius: `0 0 ${token.borderRadius}px ${token.borderRadius}px`,
        }}
      >
        <span style={{ color: token.colorTextSecondary, fontSize: token.fontSize }}>
          Total: <strong>{cafes.length}</strong> cafes
        </span>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={cafes.length}
          onChange={(page) => setCurrentPage(page)}
          showQuickJumper
        />
      </div>
      <ViewModal
        open={!!viewData}
        data={viewData}
        fields={cafeFields}
        title="Cafe Details"
        onClose={() => setViewData(null)}
      />
    </div>
  )
}

export default CafesTable