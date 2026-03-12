import { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
import { Button, Space, Pagination, theme } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

ModuleRegistry.registerModules([AllCommunityModule])

function ActionButtons({ data, onEdit, onDelete }) {
  return (
    <Space size={8} style={{ height: '100%', alignItems: 'center', display: 'flex' }}>
      <Button
        type="default"
        size="small"
        icon={<EditOutlined />}
        onClick={(e) => { e.stopPropagation(); onEdit(data) }}
      >
        Edit
      </Button>
      <Button
        type="default"
        size="small"
        danger
        icon={<DeleteOutlined />}
        onClick={(e) => { e.stopPropagation(); onDelete(data.id) }}
      >
        Delete
      </Button>
    </Space>
  )
}

function CafesTable({ cafes, onEdit, onDelete }) {
  const { token } = theme.useToken()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const columnDefs = [
    { field: 'name',        headerName: 'Name',        flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    { field: 'employees',   headerName: 'Employees',   flex: 1 },
    { field: 'location',    headerName: 'Location',    flex: 1 },
    {
      headerName: 'Actions',
      flex: 1,
      cellRenderer: (params) => (
        <ActionButtons
          data={params.data}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )
    }
  ]

  // Slice the data for the current page
  const paginatedCafes = cafes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handlePageChange = (page, size) => {
    setCurrentPage(page)
    setPageSize(size)
  }

  return (
    <div style={{ marginTop: 24 }}>
      {/* AG Grid — no built-in pagination */}
      <div
        className="ag-theme-alpine"
        style={{
          height: pageSize * 48 + 48, // dynamic height based on rows
          borderRadius: `${token.borderRadius}px ${token.borderRadius}px 0 0`,
          overflow: 'hidden',
          border: `1px solid ${token.colorBorder}`,
          borderBottom: 'none',
          '--ag-header-background-color': token.colorBgLayout,
          '--ag-header-foreground-color': token.colorText,
          '--ag-background-color': token.colorBgContainer,
          '--ag-odd-row-background-color': token.colorFillAlter,
          '--ag-row-hover-color': token.colorFillSecondary,
          '--ag-border-color': token.colorBorderSecondary,
          '--ag-font-family': token.fontFamily,
          '--ag-font-size': `${token.fontSize}px`,
          '--ag-selected-row-background-color': token.colorPrimaryBg,
          '--ag-range-selection-border-color': token.colorPrimary,
          '--ag-header-column-separator-color': token.colorBorderSecondary,
        }}
      >
        <AgGridReact
          rowData={paginatedCafes}
          columnDefs={columnDefs}
          pagination={false}
          rowHeight={48}
        />
      </div>

      {/* Antd Pagination bar — flush below the grid */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
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
            onChange={handlePageChange}
            showQuickJumper
            />
      </div>
    </div>
  )
}

export default CafesTable
