import {Form} from 'react-router-dom';
export const UserDetailsInputForm = ()=>{
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md space-y-6">
  <Form method="POST" encType="multipart/form-data" className="space-y-4">
    <div>
      <label
        htmlFor="profilePhoto"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Add Profile Photo
      </label>
      <input
        type="file"
        required
        name="profilePhoto"
        id="profilePhoto"
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />
    </div>

    <div>
      <input
        type="text"
        name="address"
        placeholder="Your Residence Address"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <input
        type="email"
        name="email"
        placeholder="Enter Your Email"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <button
      type="submit"
      className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
    >
      Complete My Profile
    </button>
  </Form>
</div>
  )
}

export const postCompleteMyprofile  = async()=>{
  try {
    
  } catch (error) {
    
  }
}