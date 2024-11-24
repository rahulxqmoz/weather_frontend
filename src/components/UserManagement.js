import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blockUser, fetchUsers } from "../store/userSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const { token, user: is_CurrentUser } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(fetchUsers(token));
    }
  }, [token, dispatch]);

  const handleBlockUser = (userId) => {
    dispatch(blockUser({ userId, token, action: "block" }));
  };

  const handleUnblockUser = (userId) => {
    dispatch(blockUser({ userId, token, action: "unblock" }));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h3>User Management</h3>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.is_active ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {user.is_active ? "Active" : "Blocked"}
                  </span>
                </td>
                <td>
                  {user.is_active && is_CurrentUser.id !== user.id ? (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleBlockUser(user.id)}
                    >
                      Block
                    </button>
                  ) : (
                    !user.is_active && is_CurrentUser.id !== user.id && (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleUnblockUser(user.id)}
                      >
                        Unblock
                      </button>
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;
