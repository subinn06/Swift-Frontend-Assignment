import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import CommentTable from '../../components/CommentTable';
import Pagination from '../../components/Pagination';
import { saveDashboardState, getDashboardState } from '../../utils/localStorage';
import './index.css';

const Dashboard = () => {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/comments');
      const data = await res.json();
      setComments(data);

      const saved = getDashboardState();
      if (saved) {
        setSearchText(saved.searchText || '');
        setCurrentPage(saved.currentPage || 1);
        setPageSize(saved.pageSize || 10);
        setSortField(saved.sortField || '');
        setSortOrder(saved.sortOrder || '');
      }
      setIsInitialized(true);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    let updated = [...comments];

    if (searchText) {
      updated = updated.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(searchText.toLowerCase());
        const emailMatch = item.email.toLowerCase().includes(searchText.toLowerCase());
        const bodyMatch = item.body.toLowerCase().includes(searchText.toLowerCase());
        return nameMatch || emailMatch || bodyMatch;
      });
    }

    if (sortField && sortOrder) {
      updated.sort((a, b) => {
        const valA = a[sortField].toLowerCase ? a[sortField].toLowerCase() : a[sortField];
        const valB = b[sortField].toLowerCase ? b[sortField].toLowerCase() : b[sortField];
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredComments(updated);
  }, [comments, searchText, sortField, sortOrder, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      saveDashboardState({ searchText, currentPage, pageSize, sortField, sortOrder });
    }
  }, [searchText, currentPage, pageSize, sortField, sortOrder, isInitialized]);

  const handleSort = (field) => {
    if (field !== sortField) {
      setSortField(field);
      setSortOrder('asc');
    } else {
      if (sortOrder === '') setSortOrder('asc');
      else if (sortOrder === 'asc') setSortOrder('desc');
      else {
        setSortField('');
        setSortOrder('');
      }
    }
  };

  const getSortArrow = (field) => {
    if (sortField === field) {
      return sortOrder === 'asc' ? '▲' : '▼';
    }
    return '▲▼';
  };

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <div className="top-bar">
          <div className="sort-buttons">
            <button className="back-arrow" onClick={() => navigate('/')}>←</button>
            <button onClick={() => handleSort('postId')}>
              Sort Post ID {getSortArrow('postId')}
            </button>
            <button onClick={() => handleSort('name')}>
              Sort Name {getSortArrow('name')}
            </button>
            <button onClick={() => handleSort('email')}>
              Sort Email {getSortArrow('email')}
            </button>
          </div>

          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search name, email, comment"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <CommentTable
          comments={filteredComments}
          currentPage={currentPage}
          pageSize={pageSize}
          onSortChange={handleSort}
          sortField={sortField}
          sortOrder={sortOrder}
        />

        <Pagination
          totalItems={filteredComments.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
}

export default Dashboard;
