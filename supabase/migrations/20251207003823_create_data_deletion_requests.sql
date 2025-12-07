/*
  # Create data deletion requests table

  1. New Tables
    - `data_deletion_requests`
      - `id` (uuid, primary key) - Unique identifier for each request
      - `full_name` (text) - Full name of the person requesting deletion
      - `email` (text) - Email address of the person
      - `reason` (text, nullable) - Optional reason for deletion
      - `status` (text) - Status of the request (pending, processing, completed)
      - `created_at` (timestamptz) - When the request was created
      - `processed_at` (timestamptz, nullable) - When the request was processed
  
  2. Security
    - Enable RLS on `data_deletion_requests` table
    - No public access (only internal processing)
    - Admin-only access through service role

  3. Indexes
    - Index on email for faster lookups
    - Index on status for filtering requests
*/

CREATE TABLE IF NOT EXISTS data_deletion_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  reason text DEFAULT '',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'rejected')),
  created_at timestamptz DEFAULT now(),
  processed_at timestamptz
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_deletion_requests_email ON data_deletion_requests(email);
CREATE INDEX IF NOT EXISTS idx_deletion_requests_status ON data_deletion_requests(status);
CREATE INDEX IF NOT EXISTS idx_deletion_requests_created_at ON data_deletion_requests(created_at DESC);

-- Enable RLS
ALTER TABLE data_deletion_requests ENABLE ROW LEVEL SECURITY;

-- No public policies - this table is internal only
-- Access is restricted to service role for admin functions
