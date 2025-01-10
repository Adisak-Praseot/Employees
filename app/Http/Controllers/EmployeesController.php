<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Employee;
use Inertia\Inertia;

class EmployeesController extends Controller
{
    public function index(Request $request)
{
    $query = $request->input('search'); // รับค่าจาก URL
    $order = $request->input('order', 'asc'); // รับการเรียงลำดับจาก URL (ค่า default คือ 'asc')

    $employees = DB::table('employees')
        ->where('emp_no', 'like', '%' . $query . '%')  // ค้นหาจาก ID
        ->orWhere('first_name', 'like', '%' . $query . '%')  // ค้นหาจาก first_name
        ->orWhere('last_name', 'like', '%' . $query . '%')  // ค้นหาจาก last_name
        ->orderBy('emp_no', $order) // การเรียงลำดับตาม emp_no
        ->paginate(10);

    return Inertia::render('Employees/Index', [
        'employees' => $employees,
        'query' => $query,  // ส่ง query กลับไปยัง React component
        'order' => $order,  // ส่งการเรียงลำดับกลับไปยัง React component
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
