import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ employees, query }) {
    const [search, setSearch] = useState(query || '');
    const [sortColumn, setSortColumn] = useState('emp_no');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(employees.current_page);
    const [totalPages, setTotalPages] = useState(employees.last_page);
    const [isLoading, setIsLoading] = useState(false);

    const fetchEmployees = (params) => {
        setIsLoading(true);
        router.get('/employee', params, {
            replace: true,
            preserveState: true,
            onFinish: () => setIsLoading(false),
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchEmployees({ search, sortColumn, sortOrder, page: 1 });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchEmployees({ search, sortColumn, sortOrder, page });
    };

    const handleSort = (column) => {
        const newSortOrder = column === sortColumn && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortOrder(newSortOrder);
        fetchEmployees({ search, sortColumn: column, sortOrder: newSortOrder, page: currentPage });
    };

    return (
        <AuthenticatedLayout>
        <div className="container mx-auto p-8 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 shadow-lg rounded-lg">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-purple-700 tracking-wide">
                Slave trade list
            </h1>

            <form onSubmit={handleSearch} className="flex justify-center mb-8">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-l-md p-3 w-1/3 focus:outline-none focus:ring-4 focus:ring-pink-300"
                    placeholder="Search employees..."
                />
                <button
                    type="submit"
                    className="bg-purple-500 text-white px-5 py-3 rounded-r-md hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-yellow-400"
                >
                    Search
                </button>
            </form>

            {isLoading ? (
                <p className="text-center text-pink-500 font-semibold mt-8">Loading...</p>
            ) : employees.data.length > 0 ? (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200 shadow-xl rounded-lg overflow-hidden">
                            <thead className="bg-gradient-to-r from-yellow-100 to-pink-200 text-purple-900 font-semibold">
                                <tr>
                                    {['emp_no', 'first_name', 'last_name', 'gender', 'birthday'].map((col) => (
                                        <th
                                            key={col}
                                            onClick={() => handleSort(col)}
                                            className="border border-gray-300 px-4 py-3 text-left cursor-pointer hover:bg-yellow-300 transition duration-200"
                                        >
                                            {col.replace('_', ' ').toUpperCase()}
                                            {sortColumn === col && (
                                                <span>{sortOrder === 'asc' ? ' ↑' : ' ↓'}</span>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {employees.data.map((employee, index) => (
                                    <tr
                                        key={employee.emp_no}
                                        className={`${
                                            index % 2 === 0 ? 'bg-pink-50' : 'bg-yellow-50'
                                        } hover:bg-purple-200 transition duration-200`}
                                    >
                                        <td className="border border-gray-300 px-4 py-3">{employee.emp_no}</td>
                                        <td className="border border-gray-300 px-4 py-3">{employee.first_name}</td>
                                        <td className="border border-gray-300 px-4 py-3">{employee.last_name}</td>
                                        <td className="border border-gray-300 px-4 py-3">
                                            {employee.gender === 'M' ? 'Male' : 'Female'}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-3">{employee.birth_date}</td>
                                       
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center items-center mt-6 space-x-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>

                        <span className="text-lg font-semibold text-purple-700">
                            {currentPage} / {totalPages}
                        </span>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-center text-red-500 font-semibold mt-8">No data found</p>
            )}
        </div>
        </AuthenticatedLayout>
    );
}


