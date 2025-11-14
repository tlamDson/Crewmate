# Supabase Setup Instructions

## 1. Create a Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **New bucket**
4. Set the following:
   - **Name**: `crewmate-images`
   - **Public bucket**: ✅ Enable (so images are publicly accessible)
5. Click **Create bucket**

## 2. Set Up Storage Policies (Optional but Recommended)

To allow anyone to upload and read images:

1. Click on the `crewmate-images` bucket
2. Go to **Policies** tab
3. Add the following policies:

### Read Policy (Public Access)

```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'crewmate-images' );
```

### Upload Policy

```sql
CREATE POLICY "Allow uploads"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'crewmate-images' );
```

### Update Policy

```sql
CREATE POLICY "Allow updates"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'crewmate-images' );
```

### Delete Policy

```sql
CREATE POLICY "Allow deletes"
ON storage.objects FOR DELETE
USING ( bucket_id = 'crewmate-images' );
```

## 3. Update Database Table

Make sure your `Crewmates` table has a column for storing image URLs:

```sql
ALTER TABLE "Crewmates"
ADD COLUMN IF NOT EXISTS "src" TEXT;
```

## 4. Environment Variables

Ensure your `.env` file has:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Features Implemented

✅ **Image upload on create** - Upload images when creating new crewmates
✅ **Image preview** - See image preview before uploading
✅ **Image upload on edit** - Change crewmate images in edit mode
✅ **Loading states** - UI feedback during upload
✅ **Error handling** - Alerts for upload failures
