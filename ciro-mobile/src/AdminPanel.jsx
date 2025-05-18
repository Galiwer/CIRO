import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './AdminPanel.css'
import api from './api'

function AdminPanel() {
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [version, setVersion] = useState('')
  const [firmwareLink, setFirmwareLink] = useState('')
  const [releaseNotes, setReleaseNotes] = useState('')
  const [uploadStatus, setUploadStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [existingFirmware, setExistingFirmware] = useState([])
  const [loadingFirmware, setLoadingFirmware] = useState(true)

  // Fetch existing firmware on component mount
  useEffect(() => {
    fetchExistingFirmware()
  }, [])

  const fetchExistingFirmware = async () => {
    try {
      setLoadingFirmware(true)
      const response = await api.getAllFirmware()
      setExistingFirmware(response.data)
      setLoadingFirmware(false)
    } catch (err) {
      setError('Failed to load existing firmware')
      setLoadingFirmware(false)
      console.error('Error loading firmware:', err)
    }
  }

  const handleUpload = async (event) => {
    event.preventDefault()
    
    // Validation
    if (!brand || !model || !version || !firmwareLink) {
      setUploadStatus('Please fill in all required fields')
      return
    }

    // Create firmware data object
    const firmwareData = {
      brand,
      model,
      version,
      firmwareLink,
      releaseNotes
    }

    try {
      setLoading(true)
      setError(null)
      
      // Send data to server
      await api.uploadFirmware(firmwareData)
      
      // Show success message
      setUploadStatus('Firmware uploaded successfully!')
      
      // Reset form
      setBrand('')
      setModel('')
      setVersion('')
      setFirmwareLink('')
      setReleaseNotes('')
      
      // Refresh the firmware list
      fetchExistingFirmware()
      
      setLoading(false)
    } catch (err) {
      setError('Failed to upload firmware. Please try again.')
      setUploadStatus('')
      setLoading(false)
      console.error('Error uploading firmware:', err)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this firmware?')) {
      try {
        setLoadingFirmware(true)
        await api.deleteFirmware(id)
        setUploadStatus('Firmware deleted successfully!')
        
        // Refresh the firmware list
        fetchExistingFirmware()
      } catch (err) {
        setError('Failed to delete firmware. Please try again.')
        setLoadingFirmware(false)
        console.error('Error deleting firmware:', err)
      }
    }
  }

  return (
    <div className="admin-panel-container">
      <header>
        <h1>Admin Panel</h1>
        <Link to="/" className="back-link">Back to Home</Link>
      </header>
        
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleUpload} className="upload-form">
        <h2>Upload New Firmware</h2>
        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input 
            type="text" 
            id="brand" 
            placeholder="Enter device brand" 
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input 
            type="text" 
            id="model" 
            placeholder="Enter device model" 
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="version">Version</label>
          <input 
            type="text" 
            id="version" 
            placeholder="Enter firmware version" 
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firmware-link">Firmware Link:</label>
          <input 
            type="text" 
            id="firmware-link" 
            placeholder="Paste firmware download link" 
            value={firmwareLink}
            onChange={(e) => setFirmwareLink(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="release-notes">Release Notes (Optional):</label>
          <textarea 
            id="release-notes" 
            placeholder="Enter firmware release notes" 
            value={releaseNotes}
            onChange={(e) => setReleaseNotes(e.target.value)}
            disabled={loading}
          ></textarea>
        </div>
        <button 
          type="submit" 
          className="upload-button"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Firmware'}
        </button>
        
        {uploadStatus && (
          <div className="status-message">
            {uploadStatus}
          </div>
        )}
      </form>

      <div className="existing-firmware-section">
        <h2>Existing Firmware</h2>
        {loadingFirmware ? (
          <div className="loading-message">Loading firmware data...</div>
        ) : existingFirmware.length === 0 ? (
          <div className="no-data-message">No firmware entries found</div>
        ) : (
          <div className="firmware-table-container">
            <table className="firmware-table">
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Version</th>
                  <th>Upload Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {existingFirmware.map((firmware) => (
                  <tr key={firmware.id}>
                    <td>{firmware.brand}</td>
                    <td>{firmware.model}</td>
                    <td>{firmware.version}</td>
                    <td>{new Date(firmware.uploadDate).toLocaleDateString()}</td>
                    <td>
                      <button 
                        className="delete-button"
                        onClick={() => handleDelete(firmware.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel