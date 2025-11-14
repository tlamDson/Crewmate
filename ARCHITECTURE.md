# Project Architecture Guide

## 📁 Improved Structure

```
src/
├── config/
│   └── constants.js          # Configuration constants (bucket names, limits, etc.)
├── services/
│   ├── crewmateService.js    # All Crewmate CRUD operations
│   ├── storageService.js     # Image upload/delete functionality
│   └── index.js              # Service exports
├── utils/
│   └── errorHandler.js       # Centralized error handling & validation
├── components/
│   ├── CrewMateCard.jsx      # Individual crewmate card
│   └── Sidebar.jsx           # Navigation sidebar
├── pages/
│   ├── CreateCrewMate.jsx    # Create new crewmate
│   ├── CrewmateGallery.jsx   # Display all crewmates
│   └── Home.jsx              # Home page
└── supabaseClient.js         # Supabase client initialization only
```

## 🎯 Key Improvements

### 1. **Separation of Concerns**

- **Components**: Only handle UI and user interactions
- **Services**: Handle all data fetching and business logic
- **Utils**: Reusable helper functions
- **Config**: Centralized configuration

### 2. **Service Layer Pattern**

#### crewmateService.js

Handles all database operations:

- `getAllCrewmates()` - Fetch all crewmates
- `getCrewmateById(id)` - Get single crewmate
- `createCrewmate(data)` - Create new crewmate
- `updateCrewmate(id, updates)` - Update existing crewmate
- `deleteCrewmate(id)` - Delete crewmate
- `searchCrewmates(term)` - Search functionality

#### storageService.js

Handles all file operations:

- `uploadImage(file)` - Upload image to Supabase Storage
- `deleteImage(path)` - Delete image from storage
- `extractPathFromUrl(url)` - Extract file path from URL

### 3. **Error Handling**

- Centralized error messages
- User-friendly error responses
- File validation before upload
- Consistent error logging

### 4. **Configuration Management**

- Single source of truth for constants
- Easy to update bucket names, limits, etc.
- Type-safe configurations

## 🔧 Usage Examples

### Creating a Crewmate

```javascript
import { createCrewmate, uploadImage } from "../services";

const handleCreate = async () => {
  try {
    // Upload image first
    const { url } = await uploadImage(imageFile);

    // Create crewmate with image URL
    const newCrewmate = await createCrewmate({
      name: "Red",
      speed: 5,
      color: "red",
      src: url,
    });

    console.log("Created:", newCrewmate);
  } catch (error) {
    alert(error.message);
  }
};
```

### Updating a Crewmate

```javascript
import { updateCrewmate } from "../services";

const handleUpdate = async (id) => {
  try {
    const updated = await updateCrewmate(id, {
      name: "Blue",
      speed: 8,
    });

    console.log("Updated:", updated);
  } catch (error) {
    alert(error.message);
  }
};
```

### Fetching All Crewmates

```javascript
import { getAllCrewmates } from "../services";

useEffect(() => {
  const loadCrewmates = async () => {
    try {
      const data = await getAllCrewmates();
      setCrewmates(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  loadCrewmates();
}, []);
```

## 🚀 Benefits

### Scalability

- Easy to add new features
- Clear separation makes code easier to understand
- Can easily add caching, optimistic updates, etc.

### Maintainability

- Single responsibility principle
- Easy to find and fix bugs
- Changes in one place don't break others

### Testability

- Services can be unit tested independently
- Mock services for component testing
- Better test coverage

### Reusability

- Services can be used across multiple components
- Utilities are shared
- No code duplication

## 📝 Best Practices

1. **Always use services** - Never call Supabase directly from components
2. **Handle errors** - Always wrap service calls in try-catch
3. **Loading states** - Show feedback during async operations
4. **Validation** - Validate data before sending to services
5. **Constants** - Use constants from config, never hardcode values

## 🔄 Migration from Old Code

### Before:

```javascript
// Direct Supabase call in component
const { data, error } = await supabase.from("Crewmates").select("*");
```

### After:

```javascript
// Using service
const data = await getAllCrewmates();
```

### Before:

```javascript
// File upload in component
const { data, error } = await supabase.storage
  .from("crewmate-images")
  .upload(path, file);
```

### After:

```javascript
// Using service with validation
const { url, path } = await uploadImage(file);
```

## 🎨 Future Enhancements

1. **Add React Query** - For better data fetching and caching
2. **Add Context API** - For global state management
3. **Add TypeScript** - For better type safety
4. **Add Unit Tests** - Test services independently
5. **Add Loading/Error Components** - Reusable UI components
6. **Add Optimistic Updates** - Update UI before server response
7. **Add Pagination** - For large lists
8. **Add Search/Filter** - Enhanced search functionality
